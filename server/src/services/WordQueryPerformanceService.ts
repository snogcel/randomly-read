import { logger } from '../utils/logger';
import { PerformanceMonitor, QueryMetrics } from '../utils/performanceMonitor';
import { Word } from '../models/Word';
import mongoose from 'mongoose';

export interface QueryPerformanceMetrics {
  queryId: string;
  timestamp: Date;
  filter: any;
  executionTimeMs: number;
  docsExamined: number;
  docsReturned: number;
  indexUsed: string;
  cacheHit: boolean;
  memoryUsage: number;
  cpuUsage?: number;
}

export interface PerformanceAlert {
  type: 'slow_query' | 'high_memory' | 'index_miss' | 'cache_miss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metrics: QueryPerformanceMetrics;
  suggestions: string[];
}

export interface PerformanceReport {
  period: { start: Date; end: Date };
  totalQueries: number;
  averageExecutionTime: number;
  slowQueries: number;
  cacheHitRate: number;
  indexUsageStats: { [indexName: string]: number };
  topSlowQueries: QueryPerformanceMetrics[];
  alerts: PerformanceAlert[];
  recommendations: string[];
}

export class WordQueryPerformanceService {
  private static instance: WordQueryPerformanceService;
  private performanceMonitor: PerformanceMonitor;
  private queryMetrics: QueryPerformanceMetrics[] = [];
  private alerts: PerformanceAlert[] = [];
  private readonly MAX_METRICS = 1000;
  private readonly MAX_ALERTS = 100;

  // Performance thresholds
  private readonly THRESHOLDS = {
    slowQueryMs: 1000,
    verySlowQueryMs: 5000,
    highMemoryMB: 100,
    criticalMemoryMB: 500,
    lowCacheHitRate: 0.5,
    criticalCacheHitRate: 0.2
  };

  private constructor() {
    this.performanceMonitor = PerformanceMonitor.getInstance();
    
    // Clean up old metrics periodically
    setInterval(() => this.cleanupOldMetrics(), 5 * 60 * 1000); // Every 5 minutes
  }

  public static getInstance(): WordQueryPerformanceService {
    if (!WordQueryPerformanceService.instance) {
      WordQueryPerformanceService.instance = new WordQueryPerformanceService();
    }
    return WordQueryPerformanceService.instance;
  }

  /**
   * Record query performance metrics
   */
  recordQueryMetrics(
    queryId: string,
    filter: any,
    executionTimeMs: number,
    docsExamined: number,
    docsReturned: number,
    indexUsed: string,
    cacheHit: boolean = false
  ): void {
    const metrics: QueryPerformanceMetrics = {
      queryId,
      timestamp: new Date(),
      filter,
      executionTimeMs,
      docsExamined,
      docsReturned,
      indexUsed,
      cacheHit,
      memoryUsage: this.getCurrentMemoryUsage()
    };

    this.queryMetrics.push(metrics);
    
    // Keep only recent metrics
    if (this.queryMetrics.length > this.MAX_METRICS) {
      this.queryMetrics = this.queryMetrics.slice(-this.MAX_METRICS);
    }

    // Check for performance issues
    this.checkPerformanceAlerts(metrics);

    // Log performance data
    this.logPerformanceMetrics(metrics);
  }

  /**
   * Analyze query performance and explain plan
   */
  async analyzeQueryPerformance(filter: any): Promise<{
    executionStats: any;
    indexUsage: any;
    recommendations: string[];
  }> {
    try {
      // Execute explain plan
      const explainResult = await Word.find(filter).explain('executionStats') as any;
      
      const executionStats = explainResult.executionStats;
      const recommendations: string[] = [];

      // Analyze execution stats
      if (executionStats.executionTimeMillis > this.THRESHOLDS.slowQueryMs) {
        recommendations.push('Query is slow - consider adding more selective filters');
      }

      if (executionStats.totalDocsExamined > executionStats.totalDocsReturned * 10) {
        recommendations.push('Query examines too many documents - improve index selectivity');
      }

      const stage = executionStats.executionStages;
      if (stage.stage === 'COLLSCAN') {
        recommendations.push('Query is using collection scan - add appropriate indexes');
      }

      // Check index usage
      const indexUsage = {
        indexName: stage.indexName || 'COLLSCAN',
        keysExamined: stage.keysExamined || 0,
        docsExamined: stage.docsExamined || 0,
        isMultiKey: stage.isMultiKey || false
      };

      if (indexUsage.keysExamined > indexUsage.docsExamined * 2) {
        recommendations.push('Index is not very selective - consider compound indexes');
      }

      return {
        executionStats,
        indexUsage,
        recommendations
      };
    } catch (error) {
      logger.error('Error analyzing query performance:', error);
      return {
        executionStats: null,
        indexUsage: null,
        recommendations: ['Failed to analyze query performance']
      };
    }
  }

  /**
   * Get real-time performance metrics
   */
  getRealTimeMetrics(): {
    currentQueries: number;
    averageResponseTime: number;
    cacheHitRate: number;
    memoryUsage: number;
    alertCount: number;
  } {
    const recentMetrics = this.getRecentMetrics(5 * 60 * 1000); // Last 5 minutes
    
    const totalQueries = recentMetrics.length;
    const averageResponseTime = totalQueries > 0 
      ? recentMetrics.reduce((sum, m) => sum + m.executionTimeMs, 0) / totalQueries
      : 0;
    
    const cacheHits = recentMetrics.filter(m => m.cacheHit).length;
    const cacheHitRate = totalQueries > 0 ? cacheHits / totalQueries : 0;
    
    const currentMemoryUsage = this.getCurrentMemoryUsage();
    const recentAlerts = this.alerts.filter(a => 
      Date.now() - a.metrics.timestamp.getTime() < 5 * 60 * 1000
    ).length;

    return {
      currentQueries: totalQueries,
      averageResponseTime: Math.round(averageResponseTime),
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      memoryUsage: currentMemoryUsage,
      alertCount: recentAlerts
    };
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport(periodHours: number = 24): PerformanceReport {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - periodHours * 60 * 60 * 1000);
    
    const periodMetrics = this.queryMetrics.filter(m => 
      m.timestamp >= startTime && m.timestamp <= endTime
    );

    const totalQueries = periodMetrics.length;
    const averageExecutionTime = totalQueries > 0
      ? periodMetrics.reduce((sum, m) => sum + m.executionTimeMs, 0) / totalQueries
      : 0;

    const slowQueries = periodMetrics.filter(m => 
      m.executionTimeMs > this.THRESHOLDS.slowQueryMs
    ).length;

    const cacheHits = periodMetrics.filter(m => m.cacheHit).length;
    const cacheHitRate = totalQueries > 0 ? cacheHits / totalQueries : 0;

    // Index usage statistics
    const indexUsageStats: { [indexName: string]: number } = {};
    periodMetrics.forEach(m => {
      indexUsageStats[m.indexUsed] = (indexUsageStats[m.indexUsed] || 0) + 1;
    });

    // Top slow queries
    const topSlowQueries = periodMetrics
      .sort((a, b) => b.executionTimeMs - a.executionTimeMs)
      .slice(0, 10);

    // Recent alerts
    const periodAlerts = this.alerts.filter(a => 
      a.metrics.timestamp >= startTime && a.metrics.timestamp <= endTime
    );

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      periodMetrics, 
      cacheHitRate, 
      slowQueries / totalQueries
    );

    return {
      period: { start: startTime, end: endTime },
      totalQueries,
      averageExecutionTime: Math.round(averageExecutionTime),
      slowQueries,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      indexUsageStats,
      topSlowQueries,
      alerts: periodAlerts,
      recommendations
    };
  }

  /**
   * Monitor query in real-time
   */
  async monitorQuery<T>(
    queryId: string,
    filter: any,
    queryFunction: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    const startMemory = this.getCurrentMemoryUsage();
    
    try {
      // Execute query
      const result = await queryFunction();
      
      const executionTime = Date.now() - startTime;
      const endMemory = this.getCurrentMemoryUsage();
      
      // Record metrics (simplified - in real implementation, you'd get actual docs examined)
      this.recordQueryMetrics(
        queryId,
        filter,
        executionTime,
        0, // Would need to get from explain plan
        Array.isArray(result) ? result.length : 1,
        'AUTO', // Would need to get from explain plan
        false // Would need to check cache
      );

      return result;
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Record failed query
      this.recordQueryMetrics(
        queryId,
        filter,
        executionTime,
        0,
        0,
        'ERROR',
        false
      );

      throw error;
    }
  }

  /**
   * Check for performance alerts
   */
  private checkPerformanceAlerts(metrics: QueryPerformanceMetrics): void {
    const alerts: PerformanceAlert[] = [];

    // Slow query alert
    if (metrics.executionTimeMs > this.THRESHOLDS.verySlowQueryMs) {
      alerts.push({
        type: 'slow_query',
        severity: 'critical',
        message: `Very slow query detected: ${metrics.executionTimeMs}ms`,
        metrics,
        suggestions: [
          'Add more selective indexes',
          'Reduce filter complexity',
          'Consider query optimization'
        ]
      });
    } else if (metrics.executionTimeMs > this.THRESHOLDS.slowQueryMs) {
      alerts.push({
        type: 'slow_query',
        severity: 'medium',
        message: `Slow query detected: ${metrics.executionTimeMs}ms`,
        metrics,
        suggestions: [
          'Review query filters',
          'Check index usage'
        ]
      });
    }

    // High memory usage alert
    if (metrics.memoryUsage > this.THRESHOLDS.criticalMemoryMB) {
      alerts.push({
        type: 'high_memory',
        severity: 'critical',
        message: `Critical memory usage: ${metrics.memoryUsage}MB`,
        metrics,
        suggestions: [
          'Reduce query result size',
          'Implement pagination',
          'Clear unused caches'
        ]
      });
    } else if (metrics.memoryUsage > this.THRESHOLDS.highMemoryMB) {
      alerts.push({
        type: 'high_memory',
        severity: 'medium',
        message: `High memory usage: ${metrics.memoryUsage}MB`,
        metrics,
        suggestions: [
          'Monitor memory usage',
          'Consider result limiting'
        ]
      });
    }

    // Index miss alert
    if (metrics.indexUsed === 'COLLSCAN') {
      alerts.push({
        type: 'index_miss',
        severity: 'high',
        message: 'Query using collection scan instead of index',
        metrics,
        suggestions: [
          'Create appropriate indexes',
          'Review query structure'
        ]
      });
    }

    // Add alerts
    this.alerts.push(...alerts);
    
    // Keep only recent alerts
    if (this.alerts.length > this.MAX_ALERTS) {
      this.alerts = this.alerts.slice(-this.MAX_ALERTS);
    }

    // Log critical alerts
    alerts.forEach(alert => {
      if (alert.severity === 'critical') {
        logger.error('Critical performance alert', alert);
      } else if (alert.severity === 'high') {
        logger.warn('Performance alert', alert);
      }
    });
  }

  /**
   * Log performance metrics
   */
  private logPerformanceMetrics(metrics: QueryPerformanceMetrics): void {
    if (metrics.executionTimeMs > this.THRESHOLDS.slowQueryMs) {
      logger.warn('Slow word query detected', {
        queryId: metrics.queryId,
        executionTime: metrics.executionTimeMs,
        docsExamined: metrics.docsExamined,
        docsReturned: metrics.docsReturned,
        indexUsed: metrics.indexUsed,
        filter: metrics.filter
      });
    } else {
      logger.debug('Word query performance', {
        queryId: metrics.queryId,
        executionTime: metrics.executionTimeMs,
        docsReturned: metrics.docsReturned,
        cacheHit: metrics.cacheHit
      });
    }
  }

  /**
   * Get recent metrics
   */
  private getRecentMetrics(periodMs: number): QueryPerformanceMetrics[] {
    const cutoff = new Date(Date.now() - periodMs);
    return this.queryMetrics.filter(m => m.timestamp >= cutoff);
  }

  /**
   * Get current memory usage
   */
  private getCurrentMemoryUsage(): number {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      return Math.round(usage.heapUsed / 1024 / 1024); // MB
    }
    return 0;
  }

  /**
   * Generate performance recommendations
   */
  private generateRecommendations(
    metrics: QueryPerformanceMetrics[],
    cacheHitRate: number,
    slowQueryRate: number
  ): string[] {
    const recommendations: string[] = [];

    if (cacheHitRate < this.THRESHOLDS.lowCacheHitRate) {
      recommendations.push('Low cache hit rate - consider warming up cache with common queries');
    }

    if (slowQueryRate > 0.1) {
      recommendations.push('High slow query rate - review and optimize frequent query patterns');
    }

    const collScans = metrics.filter(m => m.indexUsed === 'COLLSCAN').length;
    if (collScans > metrics.length * 0.1) {
      recommendations.push('Many queries using collection scans - create missing indexes');
    }

    const highMemoryQueries = metrics.filter(m => m.memoryUsage > this.THRESHOLDS.highMemoryMB).length;
    if (highMemoryQueries > 0) {
      recommendations.push('Some queries using high memory - implement result pagination');
    }

    return recommendations;
  }

  /**
   * Clean up old metrics
   */
  private cleanupOldMetrics(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
    
    const oldMetricsCount = this.queryMetrics.length;
    this.queryMetrics = this.queryMetrics.filter(m => m.timestamp >= cutoff);
    
    const oldAlertsCount = this.alerts.length;
    this.alerts = this.alerts.filter(a => a.metrics.timestamp >= cutoff);
    
    if (oldMetricsCount > this.queryMetrics.length || oldAlertsCount > this.alerts.length) {
      logger.debug('Cleaned up old performance data', {
        metricsRemoved: oldMetricsCount - this.queryMetrics.length,
        alertsRemoved: oldAlertsCount - this.alerts.length
      });
    }
  }

  /**
   * Get current alerts
   */
  getCurrentAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  /**
   * Clear all metrics and alerts
   */
  clearAll(): void {
    this.queryMetrics = [];
    this.alerts = [];
    logger.info('Cleared all performance metrics and alerts');
  }
}