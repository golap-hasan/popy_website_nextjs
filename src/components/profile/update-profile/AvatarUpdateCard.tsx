"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfilePhoto } from "@/services/Auth";
import { SuccessToast, ErrorToast, getInitials } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

const avatarSchema = z.object({
  image: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  }).refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: "File must be JPEG, PNG, or WebP",
  }),
});

type AvatarFormValues = z.infer<typeof avatarSchema>;

const AvatarUpdateCard = () => {
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(user?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: AvatarFormValues) => {
    try {
      const formData = new FormData();
      formData.append("file", values.image);

      const result = await updateProfilePhoto(formData);
      if (result?.success) {
        SuccessToast("Profile picture updated successfully");
        // Optionally update user context if needed
      } else {
        ErrorToast(result?.message || "Failed to update profile picture");
      }
    } catch {
      ErrorToast("An error occurred while updating profile picture");
    }
  };

  return (
    <Card className="border-border/50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-60" />
      <CardHeader className="border-b border-border/40 relative text-center">
        <div className="flex items-center justify-center gap-2">
          <Camera className="size-5 text-primary" />
          <CardTitle className="text-lg">Update profile picture</CardTitle>
        </div>
        <CardDescription>
          Upload a new profile picture. Supports JPEG, PNG, WebP up to 5MB.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <CardContent className="relative">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Avatar className="size-32 border-4 border-primary/20 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                  <AvatarImage src={preview || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Camera className="size-8 text-white" />
                </button>
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full max-w-sm">
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          handleFileChange(e);
                          field.onChange(e.target.files?.[0]);
                        }}
                        className="hidden"
                      />
                    </FormControl>
                    <div
                      onClick={handleUploadClick}
                      className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                    >
                      <Upload className="mx-auto size-8 text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPEG, PNG, WebP up to 5MB
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full max-w-sm rounded-full bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Update picture"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Form>
    </Card>
  );
};

export default AvatarUpdateCard;
