export const settingLabelLoader = (option) => {
    switch (option) {
        case "1":
        return "Speaking at Work or School"
        case "2":
        return "Speaking on the Phone"
        case "3":
        return "Presenting a Topic"
        case "4":
        return "Attending a Social Event"
        case "5":
        return "Relaxing with Friends"
        case "6":
        return "Relaxing at Home"
        default: 
        return option;
    }
}

export const audienceLabelLoader = (option) => {
    switch (option) {
        case "1":
        return "Parent"
        case "2":
        return "Family"
        case "3":
        return "Significant Other"
        case "4":
        return "Friend"
        case "5":
        return "Coworker / Classmate"
        case "6":
        return "Authority Figure"
        case "7":
        return "Service Worker"
        case "8":
        return "No Relationship"
        default: 
        return option;
    }
}

export const intentionLabelLoader = (option) => {
    switch (option) {
        case 0:
        return "Did not remember"
        case 50:
        return "Remembered "
        case 100:
        return "Remembered and used"
        default: 
        return option;
    }
}

export const easeLabelLoader = (option) => {
    switch (option) {
        case 0:
        return "Speech was difficult"
        case 35:
        return "Speech was less difficult"
        case 70:
        return "Speech was easier"
        case 100:
        return "Speech was easy"
        default: 
        return option;
    }
}