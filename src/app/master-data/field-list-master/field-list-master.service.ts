import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FieldListMasterService {
	public fieldList: any[] = [];

	constructor() {
		this.fieldList = [ 
			{ 
				"key":"Formulary Code",
				"label":"Formulary Code",
				"required":false,
				"disabled":false,
				"controlType":"textBox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"type":"text",
				"theme":"bootstrap"
			},
			{ 
				"key":"Formulary Name",
				"label":"Formulary Name",
				"required":false,
				"disabled":false,
				"controlType":"textBox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"type":"text",
				"theme":"bootstrap"
			},
			{ 
				"key":"Read Only",
				"label":"Read Only",
				"required":false,
				"disabled":false,
				"controlType":"checkbox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
			
				]
			},
			{ 
				"key":"Active Ingredient",
				"label":"Active Ingredient",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"Paracetamol",
						"value":"Paracetamol"
					}
				]
			},
			{ 
				"key":"Strength",
				"label":"Strength",
				"required":false,
				"disabled":false,
				"controlType":"textBox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"type":"text",
				"theme":"bootstrap"
			},
			{ 
				"key":"Strength Unit",
				"label":"Strength Unit",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"ML",
						"value":"ML"
					},
					{ 
						"label":"MGS",
						"value":"MGS"
					}
				]
			},
			{ 
				"key":"Route",
				"label":"Route",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"Oral",
						"value":"Oral"
					},
					{ 
						"label":"Give",
						"value":"Give"
					}
				]
			},
			{ 
				"key":"Dosage Form",
				"label":"Dosage Form",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"MG",
						"value":"MG"
					},
					{ 
						"label":"GM",
						"value":"GM"
					}
				]
			},
			{ 
				"key":"Include",
				"label":"Include",
				"required":false,
				"disabled":false,
				"controlType":"checkbox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
			
				]
			},
			{ 
				"key":"Item Flags",
				"label":"Item Flags",
				"required":false,
				"disabled":false,
				"controlType":"checkbox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"Antibiotic",
						"value":"Antibiotic"
					},
					{ 
						"label":"Registered",
						"value":"Registered"
					},
					{ 
						"label":"Narcotic",
						"value":"Narcotic"
					},
					{ 
						"label":"IV",
						"value":"IV"
					}
				]
			},
			{ 
				"key":"Other Details",
				"label":"Other Details",
				"required":false,
				"disabled":false,
				"controlType":"checkbox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"Allow Early Preparation",
						"value":"Allow Early Preparation"
					},
					{ 
						"label":"Lab Required",
						"value":"Lab Required"
					},
					{ 
						"label":" Need Witness",
						"value":" Need Witness"
					},
					{ 
						"label":"Need Approval",
						"value":"Need Approval"
					}
				]
			},
			{ 
				"key":"Prescription Classification",
				"label":"Prescription Classification",
				"required":false,
				"disabled":false,
				"controlType":"radio",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"Chronic Medication",
						"value":"Chronic Medication"
					},
					{ 
						"label":"Non Chronic Medication",
						"value":"Non Chronic Medication"
					},
					{ 
						"label":"Supplies",
						"value":"Supplies"
					}
				]
			},
			{ 
				"key":"Intervention Grace Period (h)",
				"label":"Intervention Grace Period (h)",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"24",
						"value":"24"
					},
					{ 
						"label":"48",
						"value":"48"
					}
				]
			},
			{ 
				"key":"Alert Consideration",
				"label":"Alert Consideration",
				"required":false,
				"disabled":false,
				"controlType":"textArea",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap"
			},
			{ 
				"key":"Brand Names",
				"label":"Brand Names",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
					{ 
						"label":"A",
						"value":"A"
					},
					{ 
						"label":"B",
						"value":"B"
					},
					{ 
						"label":"C",
						"value":"C"
					}
				]
			},
			{ 
				"key":"A",
				"label":"A",
				"required":false,
				"disabled":false,
				"controlType":"textBox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"type":"text",
				"theme":"bootstrap"
			},
			{ 
				"key":"B",
				"label":"B",
				"required":false,
				"disabled":false,
				"controlType":"textArea",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap"
			},
			{ 
				"key":"C",
				"label":"C",
				"required":false,
				"disabled":false,
				"controlType":"number",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"type":"number",
				"theme":"bootstrap"
			},
			{ 
				"key":"D",
				"label":"D",
				"required":false,
				"disabled":false,
				"controlType":"dropdown",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
			
				]
			},
			{ 
				"key":"E",
				"label":"E",
				"required":false,
				"disabled":false,
				"controlType":"radio",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
			
				]
			},
			{ 
				"key":"F",
				"label":"F",
				"required":false,
				"disabled":false,
				"controlType":"checkbox",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap",
				"options":[ 
			
				]
			},
			{ 
				"key":"G",
				"label":"G",
				"required":false,
				"disabled":false,
				"controlType":"date",
				"validators":[ 
			
				],
				"errors":[ 
			
				],
				"theme":"bootstrap"
			},
		];
	}
}
