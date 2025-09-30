// Add interface for tools
interface Tool {
	type: 'function';
	name: string;
	description: string;
	parameters?: {
		type: string;
		properties: Record<
			string,
			{
				type: string;
				description: string;
			}
		>;
	};
}

const toolDefinitions = {
	getCurrentTime: {
		description: "Gets the current time in the user's timezone",
		parameters: {},
	},
	changeBackgroundColor: {
		description: 'Changes the background color of the page',
		parameters: {
			color: {
				type: 'string',
				description: 'Color value (hex, rgb, or color name)',
			},
		},
	},
	partyMode: {
		description: 'Triggers a confetti animation on the page',
		parameters: {},
	},
	launchWebsite: {
		description: "Launches a website in the user's browser",
		parameters: {
			url: {
				type: 'string',
				description: 'The URL to launch',
			},
		},
	},
	copyToClipboard: {
		description: "Copies text to the user's clipboard",
		parameters: {
			text: {
				type: 'string',
				description: 'The text to copy',
			},
		},
	},
	takeScreenshot: {
		description: 'Takes a screenshot of the current page',
		parameters: {},
	},
	scrapeWebsite: {
		description:
			'Scrapes a URL and returns content in markdown and HTML formats',
		parameters: {
			url: {
				type: 'string',
				description: 'The URL to scrape',
			},
		},
	},
	navigateToProperties: {
		description: 'Navigates to the properties listing page',
		parameters: {
			filters: {
				type: 'object',
				description: 'Optional filters for property search',
				properties: {
					query: { type: 'string', description: 'Search query' },
					operationType: { type: 'string', description: 'RENT, SALE, or BOTH' },
					city: { type: 'string', description: 'City name' },
					minPrice: { type: 'number', description: 'Minimum price' },
					maxPrice: { type: 'number', description: 'Maximum price' },
				},
			},
		},
	},
	navigateToProperty: {
		description: 'Navigates to a specific property detail page',
		parameters: {
			propertyId: {
				type: 'string',
				description: 'The ID of the property to view',
			},
		},
	},
	navigateToHome: {
		description: 'Navigates to the home page',
		parameters: {},
	},
	navigateToCars: {
		description: 'Navigates to the cars listing page',
		parameters: {},
	},
	navigateToCar: {
		description: 'Navigates to a specific car detail page',
		parameters: {
			carId: {
				type: 'string',
				description: 'The ID of the car to view',
			},
		},
	},
	loadPropertiesContext: {
		description: 'Loads all available properties data for AI context',
		parameters: {
			featuredOnly: {
				type: 'boolean',
				description: 'Load only featured properties (optional)',
			},
		},
	},
	navigateToCheckout: {
		description: 'Navigates to the checkout page for a specific property',
		parameters: {
			propertyId: {
				type: 'string',
				description: 'The ID of the property to checkout',
			},
		},
	},
	fillCheckoutForm: {
		description: 'Fills out the checkout form fields',
		parameters: {
			field: {
				type: 'string',
				description:
					'The form field to fill (name, phone, meetingDate, meetingTime, notes)',
			},
			value: {
				type: 'string',
				description: 'The value to fill in the field',
			},
		},
	},
	submitCheckoutForm: {
		description: 'Submits the checkout form',
		parameters: {},
	},
	updateCheckoutElement: {
		description: 'Updates or modifies DOM elements on the checkout page',
		parameters: {
			elementSelector: {
				type: 'string',
				description: 'CSS selector for the element to modify',
			},
			action: {
				type: 'string',
				description:
					'Action to perform (show, hide, changeText, changeColor, addClass, removeClass)',
			},
			value: {
				type: 'string',
				description:
					'Value for the action (text content, color, class name, etc.)',
			},
		},
	},
} as const;

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
	type: 'function',
	name,
	description: config.description,
	parameters: {
		type: 'object',
		properties: config.parameters,
	},
}));

export type { Tool };
export { tools };
