"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

const ProfileOrders = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-60" />
      <CardHeader className="border-b border-border/40 relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-primary" />
              Profile information
            </CardTitle>
            <CardDescription>
              Your personal details and contact information.
            </CardDescription>
          </div>
          <Link href="/profile/update-profile">
            <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6 py-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative group">
            <Avatar className="size-24 border-4 border-primary/20 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {getInitials(user.name || "User")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-1.5 text-primary-foreground shadow-md">
              <User className="size-4" />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center sm:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">{user.name}</h3>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium capitalize bg-primary/10 text-primary border-primary/20">
                {user.role}
              </Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:bg-background/80 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Mail className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:bg-background/80 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Phone className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-foreground">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:bg-background/80 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <MapPin className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
                  <p className="text-sm font-medium text-foreground">{user.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOrders;
