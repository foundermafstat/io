'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SensayReplica } from '@/lib/api/sensay-replicas-client';
import { format } from 'date-fns';
import { 
  Bot, 
  Globe, 
  Lock, 
  Calendar, 
  Mail, 
  Tag, 
  MessageSquare, 
  Video, 
  Volume2,
  Database,
  BrainCircuit,
  Code,
  MessageCircleQuestion
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReplicaDetailProps {
  replica: SensayReplica;
}

export default function ReplicaDetail({ replica }: ReplicaDetailProps) {
  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="border border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name:</p>
                <p className="font-medium">{replica.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type:</p>
                <p className="font-medium">{replica.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID:</p>
                <p className="font-medium text-xs truncate">{replica.uuid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Slug:</p>
                <p className="font-medium">{replica.slug}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Purpose:</p>
                <p className="font-medium">{replica.purpose}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Greeting:</p>
                <p className="font-medium">{replica.greeting}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Short Description:</p>
                <p className="font-medium">{replica.shortDescription || replica.short_description || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Access:</p>
                <div className="flex items-center gap-1 mt-1">
                  {replica.private ? (
                    <>
                      <Lock className="h-4 w-4 text-destructive" />
                      <span className="text-destructive">Private</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400">Public</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created:</p>
                <p className="font-medium">
                  {replica.created_at ? format(new Date(replica.created_at), 'dd.MM.yyyy HH:mm') : 'No data'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Owner ID:</p>
                <p className="font-medium text-xs truncate">{replica.ownerID || replica.owner_uuid}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        {replica.tags && replica.tags.length > 0 && (
          <Card className="border border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <span>Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {replica.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Allowed Emails */}
        {replica.whitelistEmails && replica.whitelistEmails.length > 0 && (
          <Card className="border border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Allowed Email Addresses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {replica.whitelistEmails.map((email, index) => (
                  <div key={index} className="px-3 py-2 bg-muted rounded-md">
                    {email}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suggested Questions */}
        {replica.suggestedQuestions && replica.suggestedQuestions.length > 0 && (
          <Card className="border border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleQuestion className="h-5 w-5 text-primary" />
                <span>Suggested Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {replica.suggestedQuestions.map((question, index) => (
                  <div key={index} className="px-3 py-2 bg-muted rounded-md">
                    {question}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* LLM Settings */}
        {replica.llm && (
          <Card className="border border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <span>LLM Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Model:</p>
                  <p className="font-medium">{replica.llm.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Memory Mode:</p>
                  <p className="font-medium">{replica.llm.memoryMode}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">System Message:</p>
                  <p className="font-medium">{replica.llm.systemMessage || replica.system_message}</p>
                </div>
                {replica.llm.tools && replica.llm.tools.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Tools:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {replica.llm.tools.map((tool, index) => (
                        <Badge key={index} variant="outline">
                          <Code className="h-3 w-3 mr-1" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Integrations */}
        <Card className="border border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Integrations & Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Video:</p>
                <Badge variant={replica.video_enabled ? "default" : "destructive"}>
                  {replica.video_enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Voice:</p>
                <Badge variant={replica.voice_enabled ? "default" : "destructive"}>
                  {replica.voice_enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ElevenLabs ID:</p>
                <p className="font-medium text-xs truncate">{replica.elevenLabsID || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chat History:</p>
                <p className="font-medium">{replica.chat_history_count || 0}</p>
              </div>
            </div>

            {/* Discord Integration */}
            {replica.discord_integration && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Discord Integration:</p>
                <div className="bg-muted p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Service Name:</p>
                      <p className="font-medium">{replica.discord_integration.service_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status:</p>
                      <Badge variant={replica.discord_integration.is_active ? "default" : "destructive"}>
                        {replica.discord_integration.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Telegram Integration */}
            {replica.telegram_integration && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Telegram Integration:</p>
                <div className="bg-muted p-3 rounded-md">
                  <div>
                    <p className="text-xs text-muted-foreground">Service Name:</p>
                    <p className="font-medium">{replica.telegram_integration.service_name}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Image */}
        {(replica.profileImage || replica.profile_image) && (
          <Card className="border border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Profile Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img 
                  src={replica.profileImage || replica.profile_image} 
                  alt={`${replica.name} profile`} 
                  className="rounded-lg max-h-[300px] max-w-full object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 break-all">
                URL: {replica.profileImage || replica.profile_image}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
