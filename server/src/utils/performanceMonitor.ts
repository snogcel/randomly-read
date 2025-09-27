import { logger } from './logger';
import { performance } from 'perf_hooks';

export interface QueryMetrics {
  operation: string;
  executionTime: number;
  resultCount?: number;
  cacheHit?: boolean;
  indexUsed?: string;
  errorOccurred?: boolean;
  userId?: string;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: QueryMetrics[] = [];
  private readonly MAX_METRICS = 1000;

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start timing an operation
   */
  startTimer(operation: string): () => QueryMetrics {
    const startTime = performance.now();
    
    return (additionalData: Partial<QueryMetrics> = {}) => {
      const executionTime = performance.now() - startTime;
      
      const metrics: QueryMetrics = {
        operation,
        executionTime: Math.round(executionTime * 100) / 100, // Round to 2 decimal places
        ...additionalData
      };

      this.recordMetrics(metrics);
      return metrics;
    };
  }

  /**
   * Record query metrics
   */
  recordMetrics(metrics: QueryMetrics): void {
    this.metrics.push(metrics);
    
    // Keep only the most recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // Log slow queries
    if (metrics.executionTime > 1000) { // > 1 second
      logger.warn('Slow query detected', metrics);
    } else if (metrics.executionTime > 500) { // > 500ms
      logger.info('Query performance', metrics);
    } else {
      logger.debug('Query executed', metrics);
    }
  }

  /**
   * Get performance statistics
   */
  getStats(operation?: string): {
    totalQueries: number;
    averageExecutionTime: number;
    slowQueries: number;
    cacheHitRate: number;
    errorRate: number;
    recentMetrics: QueryMetrics[];
  } {
    const filteredMetrics = operation 
      ? this.metrics.filter(m => m.operation === operation)
      : this.metrics;

    if (filteredMetrics.length === 0) {
      return {
        totalQueries: 0,
        averageExecutionTime: 0,
        slowQueries: 0,
        cacheHitRate: 0,
        errorRate: 0,
        recentMetrics: []
      };
    }

    const totalExecutionTime = filteredMetrics.reduce((sum, m) => sum + m.executionTime, 0);
    const slowQueries = filteredMetrics.filter(m => m.executionTime > 1000).length;
    const cacheHits = filteredMetrics.filter(m => m.cacheHit === true).length;
    const errors = filteredMetrics.filter(m => m.errorOccurred === true).length;

    return {
      totalQueries: filteredMetrics.length,
      averageExecutionTime: Math.round((totalExecutionTime / filteredMetrics.length) * 100) / 100,
      slowQueries,
      cacheHitRate: Math.round((cacheHits / filteredMetrics.length) * 100),
      errorRate: Math.round((errors / filteredMetrics.length) * 100),
      recentMetrics: filteredMetrics.slice(-10) // Last 10 queries
    };
  }

  /**
   * Get operation breakdown
   */
  getOperationBreakdown(): { [operation: string]: any } {
    const breakdown: { [operation: string]: any } = {};
    
    this.metrics.forEach(metric => {
      if (!breakdown[metric.operation]) {
        breakdown[metric.operation] = {
          count: 0,
          totalTime: 0,
          avgTime: 0,
          slowQueries: 0,
          errors: 0
        };
      }
      
      const op = breakdown[metric.operation];
      op.count++;
      op.totalTime += metric.executionTime;
      op.avgTime = Math.round((op.totalTime / op.count) * 100) / 100;
      
      if (metric.executionTime > 1000) {
        op.slowQueries++;
      }
      
      if (metric.errorOccurred) {
        op.errors++;
      }
    });

    return breakdown;
  }

  /**
   * Clear metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    logger.info('Performance metrics cleared');
  }

  /**
   * Export metrics for analysis
   */
  exportMetrics(): QueryMetrics[] {
    return [...this.metrics];
  }
}

/**
 * Decorator for monitoring GraphQL resolver performance
 */
export function monitorResolver(operation: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const monitor = PerformanceMonitor.getInstance();
      const endTimer = monitor.startTimer(`${operation}.${propertyName}`);
      
      try {
        const result = await method.apply(this, args);
        
        // Extract metrics from result if available
        const resultCount = Array.isArray(result?.words) ? result.words.length : 
                           Array.isArray(result) ? result.length : 
                           result ? 1 : 0;
        
        endTimer({
          resultCount,
          cacheHit: result?.queryStats?.cacheHit,
          indexUsed: result?.queryStats?.indexUsed,
          errorOccurred: false
        });
        
        return result;
      } catch (error) {
        endTimer({
          errorOccurred: true
        });
        throw error;
      }
    };
  };
}

/**
 * Middleware for monitoring database query performance
 */
export function createQueryMonitor(operation: string) {
  return {
    pre: function() {
      this.startTime = performance.now();
    },
    post: function() {
      const executionTime = performance.now() - this.startTime;
      const monitor = PerformanceMonitor.getInstance();
      
      monitor.recordMetrics({
        operation: `db.${operation}`,
        executionTime: Math.round(executionTime * 100) / 100,
        resultCount: Array.isArray(this.getResult()) ? this.getResult().length : 1,
        errorOccurred: false
      });
    }
  };
}