# IO - Sensay AI Real Estate Assistant 🏡🤖

**IO** is an **AI Agent powered by the Sensay API & SDK**, seamlessly integrated into real estate platforms.  
It enables users to **search, compare, and book rental or purchase properties** through natural, conversational interaction.  
With **voice and chat AI capabilities**, IO transforms the real estate experience into a personalized, intelligent journey.  

---

## Project Overview

IO is a Next.js application that leverages the **Sensay AI platform** to create and manage real estate–focused AI conversations.  
The platform provides a **modern, interactive UI** for engaging with IO, including:

- Conversational search for properties (rentals & sales)  
- Rich interactive chat with **Markdown rendering**  
- Global replica selection for personalized search experiences  
- AI-powered property recommendations  
- Persistent chat history and state management  
- Training data integration to fine-tune real estate replicas  
- Debugging tools and analytics for AI performance  
- Export and download chat sessions for clients  

---

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, shadcn/ui  
- **Content Rendering**: react-markdown, remark-gfm, rehype-raw for Markdown support  
- **State Management**: React Context API for replica selection & chat history  
- **Backend**: Next.js API routes, Prisma ORM  
- **Database**: Neon PostgreSQL  
- **Storage**: Cloudinary for property images, LocalStorage for chat persistence  
- **AI Platform**: Sensay API & SDK  
- **Mapping**: Leaflet.js for interactive property maps  

---

## Project Structure

```
io/
├── app/                       
│   ├── api/                  
│   │   └── sensay/           
│   │       ├── chat-history/  
│   │       ├── replicas/      
│   │       └── training/      
│   ├── properties/            # Property search pages
│   ├── chat-history/          
│   ├── replicas/              
│   ├── training/              
│   └── lib/                   
│       └── api/               
│           ├── sensay.ts                 
│           ├── sensay-chat-history.ts    
│           ├── sensay-replicas.ts        
│           ├── sensay-direct.ts          
│           └── sensay-training.ts        
├── components/                
│   ├── property-map.tsx       # Interactive Leaflet map
│   ├── property-card.tsx      # Property preview card
│   ├── chat-interface.tsx     
│   ├── chat-provider.tsx      
│   ├── header.tsx             
│   ├── replica-context.tsx    
│   └── replica-provider.tsx   
├── prisma/                    
├── public/                    
├── sensay-sdk/                
├── .env                       
└── README.md                  
```

---

## Key Features

### Conversational Real Estate Search

Users can describe their preferences in natural language (e.g.,  
*"Find me a 2-bedroom apartment in Barcelona with a balcony under €2000/month"*),  
and IO provides curated listings from integrated property databases.  

### Global Replica Selection

Like in MAF Coach, IO supports selecting different **Sensay replicas** (e.g., Rental Advisor, Investment Consultant, Luxury Homes).  

### Rich Markdown Rendering

The chat interface supports:

- Property highlights in **lists & tables**  
- Links to detailed property pages  
- Inline images and galleries  
- Emphasis for pricing and key features  

### Interactive Map

Powered by **Leaflet.js**, users can view property locations in real time and filter by price, type, or neighborhood.  

---

## Sensay API Integration

IO connects deeply with **Sensay AI** via multiple approaches:  

1. **SDK Wrapper** for typed access (`/sensay-sdk/`)  
2. **Direct API Calls** for chat completions & property-specific interactions  
3. **Server-Side Routes** for training data, history, and replica management  

#### Example: Chat Completion with Property Context

```typescript
export const askIO = async (query: string, replicaUuid: string) => {
  const response = await fetch(
    `https://api.sensay.io/v1/replicas/${replicaUuid}/chat/completions`,
    {
      method: "POST",
      headers: {
        "X-ORGANIZATION-SECRET": SENSAY_API_KEY,
        "X-USER-ID": SENSAY_USER_ID,
        "Content-Type": "application/json",
        "X-API-Version": "2025-03-25",
      },
      body: JSON.stringify({
        content: query,
        source: "real-estate",
      }),
    }
  );

  return await response.json();
};
```

---

## Environment Variables

```
# Sensay
SENSAY_API_KEY="your-api-key"
SENSAY_ORG_ID="your-organization-id"
SENSAY_USER_ID="your-user-id"
SENSAY_REPLICA_UUID="your-default-replica-uuid"

# Client
NEXT_PUBLIC_SENSAY_API_KEY="your-api-key"
NEXT_PUBLIC_SENSAY_USER_ID="your-user-id"
NEXT_PUBLIC_SENSAY_ORG_ID="your-organization-id"
NEXT_PUBLIC_SENSAY_REPLICA_UUID="your-default-replica-uuid"

# Database
DATABASE_URL="your-neon-database-url"

# Media
CLOUDINARY_URL="your-cloudinary-url"
```

---

## Getting Started

1. Clone repository  
2. Install dependencies:  
   ```bash
   pnpm install
   ```
3. Configure `.env` file with Sensay + database credentials  
4. Seed initial property data:  
   ```bash
   pnpm seed
   ```
5. Run dev server:  
   ```bash
   pnpm dev
   ```
6. Open `http://localhost:3000`  

---

## Roadmap

- [ ] Multi-language search support  
- [ ] AI-powered investment analysis  
- [ ] Mortgage & financing integration  
- [ ] Personalized saved searches  

---

## License

MIT © 2025 IO Team
