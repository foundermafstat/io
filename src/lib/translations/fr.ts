export const fr = {
	broadcast: {
		end: 'Arrêter la Diffusion',
		live: 'En Direct',
		start: 'Démarrer la Diffusion',
	},
	header: {
		title: 'À propos',
		about:
			"Ce projet vise à démontrer comment utiliser l'API OpenAI Realtime avec WebRTC dans un projet Next 15 moderne. Il dispose déjà des composants shadcn/ui installés et du hook de session audio WebRTC implémenté. Clonez le projet et définissez vos propres outils.",
		banner:
			'🎉 Découvrez la nouvelle bibliothèque OpenAI Realtime Blocks UI pour Next.js !',
		bannerLink: 'En savoir plus →',
		beta: 'Bêta',
		dark: 'Sombre',
		github: 'Étoile sur GitHub',
		language: 'Langue',
		light: 'Clair',
		logo: 'OpenAI Realtime Starter',
		system: 'Système',
		theme: 'Changer le thème',
		twitter: 'Suivre sur',
		home: 'Accueil',
		catalog: 'Catalogue',
		realEstate: 'Immobilier',
		adminPanel: "Panneau d'Administration",
		development: 'Développement',
		estateSearch: 'Recherche et Achat de Biens Immobiliers',
		systemManagement: 'Gestion du Système',
		developmentTools: 'Outils de Développement',
		browseProperties: 'Parcourir les Propriétés',
		smartSearch: 'Recherche Intelligente',
		compareProperties: 'Comparer les Propriétés',
		contactAgent: "Contacter l'Agent",
		bookViewing: 'Réserver une Visite',
		replicasManagement: 'Gestion des Répliques',
		aiTraining: 'Formation IA',
		databaseManagement: 'Gestion de Base de Données',
		settings: 'Paramètres',
		apiKeys: 'Clés API',
		chatHistory: 'Historique des Chats',
		experimentalApi: 'API Expérimentale',
		activeReplica: 'Réplique Active',
		refreshReplicas: 'Actualiser les Répliques',
		noReplicasAvailable: 'Aucune réplique disponible',
		loadingReplicas: 'Chargement des répliques...',
		selectReplica: 'Sélectionner une Réplique',
		hideAiAssistant: "Masquer l'Assistant IA",
		showAiAssistant: "Afficher l'Assistant IA",
	},
	hero: {
		badge: 'Next.js + shadcn/ui',
		subtitle:
			'Faites une démo en cliquant sur le bouton ci-dessous et essayez les outils disponibles',
		title: 'OpenAI Realtime API (WebRTC)',
	},
	messageControls: {
		content: 'Contenu',
		filter: 'Filtrer par type',
		log: 'Journal dans la Console',
		logs: 'Journaux de Conversation',
		search: 'Rechercher des messages...',
		type: 'Type',
		view: 'Voir les Journaux',
	},
	status: {
		error: 'Oups !',
		info: "Basculement de l'Assistant Vocal...",
		language: 'Langue changée de',
		session: 'Session établie',
		success: 'Nous sommes en direct !',
		toggle: "Basculement de l'Assistant Vocal...",
	},
	tokenUsage: {
		input: "Tokens d'Entrée",
		output: 'Tokens de Sortie',
		total: 'Tokens Totaux',
		usage: 'Utilisation des Tokens',
	},
	tools: {
		availableTools: {
			title: 'Outils Disponibles',
			copyFn: {
				description:
					'Dites "Copier ça dans le presse-papiers" pour le coller quelque part.',
				name: 'Fonction Copier',
			},
			getTime: {
				description:
					'Demandez "Quelle heure est-il ?" pour obtenir l\'heure actuelle.',
				name: "Obtenir l'Heure",
			},
			launchWebsite: {
				description:
					'"Emmène-moi sur [site web]" pour ouvrir un site dans un nouvel onglet.',
				name: 'Lancer un Site Web',
			},
			partyMode: {
				description:
					'Dites "Activer le mode fête" pour une animation de confettis dynamique !',
				name: 'Mode Fête',
			},
			themeSwitcher: {
				description:
					'Dites "Changer le fond" ou "Passer en mode sombre" ou "Passer en mode clair".',
				name: 'Changeur de Thème',
			},
			scrapeWebsite: {
				name: 'Extracteur de Site Web',
				description:
					'Dites "Extraire le contenu de [URL du site]" pour récupérer le contenu d\'une page web.',
			},
			navigateToPage: {
				name: 'Naviguer vers la Page',
				description:
					'Dites "Aller à [page]" ou "Ouvrir [URL]" pour naviguer vers une page spécifique.',
			},
			navigateToCheckout: {
				name: 'Naviguer vers checkout',
				description:
					'Dites "Aller au checkout pour la propriété [ID]" pour naviguer vers la page de checkout.',
			},
			fillCheckoutForm: {
				name: 'Remplir le formulaire de checkout',
				description:
					'Dites "Remplir [champ] avec [valeur]" pour remplir les champs du formulaire comme nom, téléphone, notes.',
			},
			submitCheckoutForm: {
				name: 'Soumettre le formulaire de checkout',
				description:
					'Dites "Soumettre le formulaire" ou "Envoyer la demande de réservation" pour soumettre le formulaire de checkout.',
			},
			updateCheckoutElement: {
				name: 'Mettre à jour les éléments de checkout',
				description:
					'Dites "Changer [élément] à [action]" pour modifier les éléments DOM sur la page de checkout.',
			},
		},
		clipboard: {
			description: 'Vous pouvez maintenant le coller quelque part.',
			success:
				"Texte copié dans le presse-papiers. Demandez à l'utilisateur de le coller quelque part.",
			toast: 'Texte copié dans le presse-papiers !',
		},
		launchWebsite: {
			description: 'Échec du lancement du site web',
			success: "Site lancé ! Informez l'utilisateur qu'il a été lancé.",
			toast: 'Lancement du site web ',
		},
		partyMode: {
			description: "Échec de l'activation du mode fête",
			success: 'Mode fête activé',
			toast: 'Mode fête !',
		},
		switchTheme: 'Thème changé en ',
		themeFailed: 'Échec du changement de thème',
		time: "Annoncer à l'utilisateur : L'heure actuelle est ",
		scrapeWebsite: {
			success: 'Contenu du site web extrait avec succès',
			description: "Échec de l'extraction du contenu du site web",
			toast: 'Extraction du contenu du site web...',
		},
	},
	transcriber: {
		title: 'Transcription en Direct',
	},
	voice: {
		select: 'Sélectionner une voix',
		ash: 'Ash - Douce et Professionnelle',
		ballad: 'Ballad - Chaleureuse et Engageante',
		coral: 'Coral - Claire et Amicale',
		sage: 'Sage - Autoritaire et Calme',
		verse: 'Verse - Dynamique et Expressive',
	},
	chatTabs: {
		textChat: 'Chat Texte',
		voiceChat: 'Chat Vocal',
	},
	voiceChat: {
		selectReplica: 'Sélectionner une Réplique',
		loadingReplicas: 'Chargement des répliques...',
		selectVoice: 'Sélectionner une Voix',
		sessionRestored: 'Session restaurée',
		sessionRestoredDescription:
			'La diffusion vocale était active et a été restaurée.',
		restoringSession:
			"Restauration de l'état de session vocale après navigation",
		sessionRestoreError: "Erreur lors de la restauration de l'état de session:",
		navigationCompleted: 'Navigation terminée',
		navigationCompletedDescription:
			'Vous avez navigué vers la page {path}. La diffusion vocale était active.',
		userNavigatedFromVoice:
			"L'utilisateur a navigué depuis la diffusion vocale depuis:",
		navigationInfoError:
			'Erreur lors du traitement des informations de navigation:',
		estateDetailsError:
			'Erreur lors du chargement des détails du bien immobilier',
		estateDetailsErrorDescription:
			'Impossible de charger les informations sur le bien immobilier sélectionné',
		loadingDatabase: 'Chargement de la base de données immobilière complète...',
		aiAgentAccess:
			"L'agent IA obtient l'accès à tous les biens immobiliers pour une meilleure assistance",
		selectedEstate: 'Bien Immobilier Sélectionné',
		readyForDiscussion: 'Prêt pour la discussion',
		estateSelectedDescription:
			"Le bien immobilier est sélectionné. L'agent vocal est prêt à donner les détails.",
		broadcastStatus: 'Statut de Diffusion',
		requiresInfo: 'Nécessite des informations',
		userAnswered: 'Utilisateur a répondu',
		currentQuestion: 'Question actuelle:',
		status: 'Statut:',
		pendingAnswer: 'En attente de réponse',
		answered: 'Répondu',
	},
	language: 'Français',
	languagePrompt:
		"Parlez et répondez uniquement en français. Il est crucial que vous mainteniez vos réponses en français. Si l'utilisateur parle dans d'autres langues, vous devriez toujours répondre en français. (French only)",
	quiz: {
		title: 'Trouvez des biens immobiliers avec IO',
		intro: {
			title: 'Bienvenue au Quiz Immobilier IO',
			subtitle:
				'Trouvons votre propriété parfaite ensemble ! Je vous guiderai à travers quelques questions pour comprendre vos besoins.',
			discover: {
				title: 'Ce que nous découvrirons :',
				items: [
					"Préférence de location ou d'achat",
					'Fourchette de budget',
					'Préférences de type de propriété',
					'Emplacement idéal',
					'Caractéristiques indispensables',
				],
			},
			aiPowered: {
				title: "Guidance alimentée par l'IA :",
				items: [
					'Chat vocal ou texte',
					'Recommandations personnalisées',
					'Recherche de propriétés en temps réel',
					"Conseils d'experts",
				],
			},
			ready: 'Prêt à trouver votre propriété de rêve ? Commençons le voyage !',
		},
		steps: {
			purpose: {
				title: 'Louer ou Acheter ?',
				subtitle:
					"Cherchez-vous à louer une propriété ou à l'acheter ? Cela m'aidera à adapter les recommandations.",
				rent: {
					title: 'Louer',
					description:
						"Vie flexible, coûts initiaux plus bas, essayez avant d'acheter",
				},
				buy: {
					title: 'Acheter',
					description:
						'Investissement à long terme, construire des capitaux propres, créer votre maison pour toujours',
				},
			},
			budget: {
				title: 'Fourchette de Budget',
				subtitle: 'Quel est votre budget pour la location/achat ?',
				custom: 'Personnalisé',
			},
			estateType: {
				title: 'Type de Propriété',
				subtitle:
					"Quel type de propriété vous intéresse ? Sélectionnez toutes celles qui s'appliquent.",
				selected: 'Sélectionné :',
			},
			location: {
				title: 'Emplacement',
				subtitle: 'Où aimeriez-vous vivre ? Choisissez votre zone préférée.',
			},
			features: {
				title: 'Caractéristiques Indispensables',
				subtitle:
					'Sélectionnez les caractéristiques qui sont importantes pour vous. Vous pouvez choisir plusieurs options.',
			},
			results: {
				title: 'Parfait ! Voici votre Profil',
				subtitle: 'Basé sur vos préférences, voici ce que vous cherchez :',
				purpose: 'Objectif',
				budget: 'Budget',
				estateTypes: 'Types de Bien Immobilier',
				location: 'Emplacement',
				features: 'Caractéristiques Indispensables',
				notSpecified: 'Non spécifié',
				noFeatures: 'Aucune caractéristique sélectionnée',
				searchMessage:
					'Maintenant, laissez-moi rechercher des propriétés qui correspondent à vos critères...',
				startOver: 'Recommencer',
				searchProperties: 'Rechercher des Propriétés',
			},
		},
		navigation: {
			prev: 'Précédent',
			next: 'Suivant',
			skip: 'Passer',
			step: 'Étape',
		},
		properties: {
			allAvailable: 'Toutes les Propriétés Disponibles',
			byPurpose: 'Propriétés par Objectif',
			byBudget: 'Propriétés dans votre Budget',
			byType: 'Propriétés par Type',
			byArea: 'Propriétés dans votre Zone',
			byFeatures: 'Propriétés avec vos Caractéristiques',
			perfectMatches: 'Vos Correspondances Parfaites',
			matching: 'Propriétés Correspondantes',
			found: 'trouvées',
			estate: 'bien immobilier',
			properties: 'propriétés',
			noProperties: 'Aucune propriété trouvée',
			completeSteps:
				"Complétez plus d'étapes pour voir des recommandations personnalisées",
			adjustPreferences:
				"Essayez d'ajuster vos préférences pour voir plus de résultats",
			selected: 'Sélectionné',
			featured: 'En vedette',
			verified: 'Vérifié',
			rent: 'Location',
			sale: 'Vente',
			perMonth: 'par mois',
			views: 'vues',
			reviews: 'avis',
			view: 'Voir',
		},
	},
	homepage: {
		title: "Trouvez Votre Propriété de Rêve avec l'IA",
		hero: {
			badge: 'Assistant IA pour la Recherche de Propriétés',
			title: 'Trouvez Votre Propriété',
			titleHighlight: 'de Rêve',
			subtitle:
				'Découvrez la propriété parfaite avec notre assistant IA intelligent. Recommandations personnalisées, recherche vocale et résultats instantanés.',
			startSearch: 'Commencer la Recherche',
			viewCatalog: 'Voir le Catalogue',
			locationPlaceholder:
				'Les emplacements seront disponibles après avoir ajouté des propriétés',
			estateShowcase: 'À partir de 2 500 $/mois',
			unknown: 'Inconnu',
			estate: 'Bien Immobilier',
		},
		popularTypes: {
			title: 'Types de Propriétés Populaires',
			subtitle: 'Choisissez le type de propriété qui correspond à vos besoins',
			placeholder:
				'Les types de propriétés seront disponibles après avoir ajouté des propriétés',
			objects: 'objets',
			availableObjects: 'propriétés disponibles à la location et à la vente',
			viewObjects: 'Voir les Propriétés',
			addingProperties: 'Ajout de Propriétés',
		},
		trending: {
			title: 'Destinations Populaires',
			subtitle:
				'Découvrez les emplacements les plus recherchés avec les meilleures offres',
			placeholder:
				'Les données des villes seront disponibles après avoir ajouté des propriétés immobilières',
			objects: 'objets',
			availableObjects: 'propriétés disponibles',
			from: 'À partir de',
			averagePrice: 'Prix Moyen :',
			explore: 'Explorer',
			analyzingMarket: 'Analyse du Marché',
		},
		features: {
			title: 'Pourquoi Nous Choisir',
			subtitle:
				'Nous utilisons une technologie de pointe pour simplifier la recherche de propriétés',
			convenientSearch: {
				title: 'Recherche Pratique',
				description:
					"Processus de recherche de propriétés intuitif avec l'IA. Obtenez des recommandations personnalisées et trouvez instantanément de bonnes affaires.",
			},
			secureTransactions: {
				title: 'Transactions Sécurisées',
				description:
					'Vérification approfondie, conditions transparentes et documentation complète. Propriétés vérifiées et services fiables sécurisés.',
			},
			smartNavigation: {
				title: 'Navigation Intelligente',
				description:
					"Analyse des emplacements avec l'IA et recherche détaillée des quartiers pour trouver la propriété parfaite, rendant le processus de recherche simple et agréable.",
			},
		},
		testimonials: {
			title: 'Avis des Clients',
			subtitle: 'Découvrez ce que disent nos clients satisfaits à notre sujet',
			reviews: [
				{
					name: 'Olivia Parker',
					handle: '@oliviaparker',
					text: "Meilleure Expérience de Recherche de Propriétés ! L'interface IA est intuitive, facilitant la recherche de la propriété idéale... Hautement recommandé !",
				},
				{
					name: 'Emma Thompson',
					handle: '@emmathompson',
					text: 'Une Expérience Parfaite ! Cette plateforme a rendu la recherche de propriétés facile... Service 5 étoiles !',
				},
				{
					name: 'Sophia Rodriguez',
					handle: '@sophiarodriguez',
					text: "Fiable et Abordable ! J'ai utilisé plusieurs plateformes immobilières auparavant, mais celle-ci se distingue... Je reviendrai pour toutes mes futures recherches.",
				},
				{
					name: 'Daniel Johnson',
					handle: '@danieljohnson',
					text: "Service Exceptionnel ! De la recherche à la clôture, tout s'est déroulé sans problème... Je recommanderai définitivement à des amis !",
				},
			],
		},
		cta: {
			title: "Votre voyage dans le monde de l'immobilier",
			titleHighlight: 'commence ici',
			subtitle:
				"Débloquez des possibilités infinies avec notre assistant IA. Trouvez votre propriété parfaite aujourd'hui !",
			viewObjects: 'Voir les Propriétés',
			contactUs: 'Nous Contacter',
		},
		footer: {
			company: 'Sensay.io',
			sections: {
				destinations: 'Destinations',
				destinationsItems: [
					'Propriétés de Plage',
					'Quartiers Historiques',
					'Vie Urbaine',
					'Stations de Montagne',
					'Villas de Luxe',
					"Propriétés d'Investissement",
				],
				resources: 'Ressources',
				resourcesItems: [
					'Blog',
					'Guide Immobilier',
					'Analyse de Marché',
					"Conseils d'Investissement",
					'Types de Propriétés',
				],
				policies: 'Politiques',
				policiesItems: [
					'Confidentialité',
					"Conditions d'Utilisation",
					'Paramètres de Cookies',
				],
				newsletter: 'Newsletter',
				newsletterText:
					'Rejoignez notre communauté ! Recevez des offres exclusives et des analyses de marché.',
				newsletterPlaceholder: 'you@domain.com',
				newsletterButton: "S'abonner",
			},
			copyright: 'Le code source est disponible sur GitHub.',
			phone: 'Téléphone',
		},
	},
	properties: {
		title: 'Propriétés Immobilières',
		foundCount: 'Propriétés trouvées : {count}',
		errorLoading: "Une erreur s'est produite lors du chargement des propriétés",
		errorTitle: 'Erreur de Chargement',
		tryAgain: 'Réessayer',
		loadMore: 'Charger Plus',
		loading: 'Chargement...',
	},
	estateFilters: {
		searchPlaceholder: 'Rechercher des propriétés...',
		title: 'Filtres',
		clear: 'Effacer',
		operationType: "Type d'Opération",
		selectOperationType: 'Sélectionner le type',
		allTypes: 'Tous les Types',
		any: "N'importe lequel",
		rent: 'Location',
		sale: 'Vente',
		both: 'Location et Vente',
		city: 'Ville',
		selectCity: 'Sélectionner la ville',
		allCities: 'Toutes les Villes',
		loading: 'Chargement...',
		priceRange: 'Gamme de Prix',
		area: 'Superficie (m²)',
		from: 'De',
		to: 'À',
		searchNearby: 'Rechercher à proximité',
	},
	estateGrid: {
		noResults: 'Aucune propriété trouvée',
		tryDifferentFilters: 'Essayez de modifier vos paramètres de recherche',
		pricePerMonth: '/mois',
		priceNotSpecified: 'Prix non spécifié',
		featured: 'En vedette',
		verified: 'Vérifié',
		imageNotAvailable: 'Image non disponible',
		more: 'plus',
		bookViewing: 'Réserver une Visite',
		operationType: {
			rent: 'Location',
			sale: 'Vente',
			both: 'Location et Vente',
		},
		estateType: {
			apartment: 'Appartement',
			house: 'Maison',
			condo: 'Condominium',
			townhouse: 'Maison de ville',
			studio: 'Studio',
			loft: 'Loft',
			penthouse: 'Penthouse',
			villa: 'Villa',
			commercial: 'Commercial',
			office: 'Bureau',
			retail: 'Commerce',
			warehouse: 'Entrepôt',
			land: 'Terrain',
			farm: 'Ferme',
			other: 'Autre',
		},
		bedrooms: 'chambres',
		bathrooms: 'salles de bain',
		area: 'm²',
		views: 'vues',
		reviews: 'avis',
		details: 'Détails',
	},
	estateDetail: {
		back: 'Retour',
		aboutProperty: 'À propos du bien immobilier',
		aboutEstate: 'À propos du bien immobilier',
		characteristics: 'Caractéristiques',
		amenities: 'Équipements',
		reviews: 'Avis',
		statistics: 'Statistiques',
		owner: 'Propriétaire',
		realEstateAgency: 'Agence Immobilière',
		verifiedPartner: 'Partenaire Vérifié',
		call: 'Appeler',
		write: 'Écrire',
		bedrooms: 'chambres',
		bathrooms: 'salles de bain',
		area: 'm²',
		floor: 'Étage',
		views: 'vues',
		contact: 'Contacter',
		addToFavorites: 'Ajouter aux Favoris',
		share: 'Partager',
		bookViewing: 'Réserver une Visite',
		featured: 'En vedette',
		verified: 'Vérifié',
		priceNotSpecified: 'Prix non spécifié',
		perMonth: '/mois',
		reviewsCount: 'avis',
		verifiedReview: 'Vérifié',
		rating: 'Note',
		cleanliness: 'Propreté',
		location: 'Emplacement',
		value: 'Rapport qualité-prix',
		communication: 'Communication',
		estateNotFound: 'Bien immobilier non trouvé',
		backToList: 'Retour à la liste',
		loadingError:
			"Une erreur s'est produite lors du chargement du bien immobilier",
		estateType: {
			apartment: 'Appartement',
			house: 'Maison',
			condo: 'Condominium',
			townhouse: 'Maison de ville',
			studio: 'Studio',
			loft: 'Loft',
			penthouse: 'Penthouse',
			villa: 'Villa',
			commercial: 'Commercial',
			office: 'Bureau',
			retail: 'Commerce',
			warehouse: 'Entrepôt',
			land: 'Terrain',
			farm: 'Ferme',
			other: 'Autre',
		},
		operationType: {
			rent: 'Location',
			sale: 'Vente',
			both: 'Location et Vente',
		},
		amenitiesList: {
			WiFi: 'WiFi',
			Parking: 'Parking',
			Security: 'Sécurité',
			'Air Conditioning': 'Climatisation',
			Heating: 'Chauffage',
			Kitchen: 'Cuisine',
			Laundry: 'Laverie',
			TV: 'TV',
			Garden: 'Jardin',
			Pool: 'Piscine',
			Gym: 'Salle de sport',
		},
	},
};
