export const WIDGETS = [
    {
        widgetName: "orders",
        widgetHeader: "Orders",
        description: "Component",
        optionalInputs: {}
    },
    {
        widgetName: "allergy",
        widgetHeader: "Allergy",
        description: "Component",
        optionalInputs: {}
    },
    {
        widgetName: "chief_complaint",
        widgetHeader: "Chief Complaint",
        description: "Component",
        optionalInputs: [
            {
                type: "checkbox",
                name: "isPragnancy",
                label: "Is Pragnancy?"
            }
        ]
    },
    {
        widgetName: "medical_prescription",
        widgetHeader: "Medical Prescription",
        description: "Component",
        optionalInputs: []
    },
    {
        widgetName: "physical_examination",
        widgetHeader: "Physical Examination",
        description: "Component",
    },
    {
        widgetName: "history",
        widgetHeader: "Histories",
        description: "Component",
    },
    {
        widgetName: "problem_list",
        widgetHeader: "Problem List",
        description: "Component",
    },
    {
        widgetName: "medication",
        widgetHeader: "Home Medication",
        description: "Component",
    },
    {
        widgetName: "vitals",
        widgetHeader: "Vital Sign",
        description: "Component",
        optionalInputs: [
            {
                type: "checkbox",
                label: "Enable Add New"
            }
        ]
    },
    {
        widgetName: "lab_report",
        widgetHeader: "Report",
        description: "Component",
    }
]