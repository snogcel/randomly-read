import React from 'react';
import { Card, CardContent, Typography, Modal, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from '../../../themeHandler';
import RoutinePreviewElement from '../elements/RoutinePreview';
import PreviewButton from '../elements/PreviewButton';
import { RoutinePreviewProps, ExerciseStep } from '../../../types/routineBuilder';

interface RoutinePreviewComponentProps {
  routineStep: ExerciseStep;
  onPreview: () => void;
  open: boolean;
  onClose: () => void;
}

const RoutinePreview: React.FC<RoutinePreviewComponentProps> = ({
  routineStep,
  onPreview,
  open,
  onClose
}) => {
  const theme = useTheme();
  const classes = styles(theme);
  const routinePreviewRef = React.useRef<any>(null);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handlePreview = () => {
    if (routinePreviewRef.current) {
      routinePreviewRef.current.refreshQuery();
    }
    onPreview();
  };

  return (
    <>
      <Card className={classes.userAdminCard}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            Routine Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            Preview how this routine step will work in practice.
          </Typography>
          
          <PreviewButton action={handlePreview} />
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="routine-preview-modal"
        aria-describedby="routine-preview-description"
      >
        <Box sx={modalStyle}>
          <Typography id="routine-preview-modal" variant="h6" component="h2" gutterBottom>
            Routine Preview
          </Typography>
          <Typography id="routine-preview-description" variant="body2" color="textSecondary" gutterBottom>
            This is how the current step configuration will appear during exercise execution.
          </Typography>
          
          <RoutinePreviewElement 
            ref={routinePreviewRef}
            routineStep={routineStep}
            classes={classes}
          />
        </Box>
      </Modal>
    </>
  );
};

export default RoutinePreview;