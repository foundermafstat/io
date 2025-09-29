// Add interface for tools
interface Tool {
    type: 'function';
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: Record<string, {
        type: string;
        description: string;
      }>;
    };
}

const toolDefinitions = {
    getCurrentTime: {
        description: 'Gets the current time in the user\'s timezone',
        parameters: {}
    },
    backgroundFunction: {
        description: 'Switches between light and dark theme modes',
        parameters: {}
    },
    partyMode: {
        description: 'Triggers a confetti animation on the page',
        parameters: {}
    },
    launchWebsite: {
        description: 'Launches a website in the user\'s browser',
        parameters: {
        url: {
            type: 'string',
            description: 'The URL to launch'
        }
        }
    },
    copyToClipboard: {
        description: 'Copies text to the user\'s clipboard',
        parameters: {
        text: {
            type: 'string',
            description: 'The text to copy'
        }
        }
    },
    scrapeWebsite: {
        description: 'Scrapes a URL and returns content in markdown and HTML formats',
        parameters: {
            url: {
                type: 'string',
                description: 'The URL to scrape'
            }
        }
    },
    navigateToPage: {
        description: 'Navigates to a specific page or URL',
        parameters: {
            path: {
                type: 'string',
                description: 'The path or URL to navigate to (e.g., "/about" or "https://example.com")'
            }
        }
    },
    findProperty: {
        description: 'Helps user find suitable properties by asking questions about their preferences and then showing matching results',
        parameters: {
            city: {
                type: 'string',
                description: 'City where the user wants to find property'
            },
            operationType: {
                type: 'string',
                description: 'Type of operation: rent or buy'
            },
            budget: {
                type: 'number',
                description: 'Maximum budget for the property'
            },
            propertyType: {
                type: 'string',
                description: 'Type of property (apartment, house, villa, etc.)'
            },
            specialRequirements: {
                type: 'string',
                description: 'Any special requirements or preferences'
            },
            checkInDate: {
                type: 'string',
                description: 'Check-in date for rental (YYYY-MM-DD format)',
                required: false
            },
            checkOutDate: {
                type: 'string',
                description: 'Check-out date for rental (YYYY-MM-DD format)',
                required: false
            }
        }
    }
} as const;

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
    type: "function",
    name,
    description: config.description,
    parameters: {
    type: 'object',
    properties: config.parameters
    }
}));


export type { Tool };
export { tools };