/** biome-ignore-all lint/style/useNamingConvention: ignore */
"use client";

import {
  CircleNotchIcon,
  GlobeHemisphereWestIcon,
  IdentificationCardIcon,
  MapPinAreaIcon,
  PencilIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import { updateProfile, uploadAvatar } from "@/api/services/auth.service";
import { FieldInfo } from "@/components/common/FieldInfo";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const LeftPage = () => {
  const { user, token, setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!token) throw new Error("You are not logged in.");
      return uploadAvatar(token, file);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      toast.success("Avatar uploaded successfully");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Failed to upload avatar: ${error.message}`
          : "Failed to upload avatar",
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Parameters<typeof updateProfile>[1]) => {
      if (!token) throw new Error("You are not logged in.");
      return updateProfile(token, data);
    },
    onSuccess: (_, updatedData) => {
      if (user) {
        setUser({ ...user, ...updatedData });
      }
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Failed to update profile: ${error.message}`
          : "Failed to update profile",
      );
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadAvatarMutation.mutate(file);
  };

  const form = useForm({
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website_url: user?.website_url || "",
    },
    onSubmit: async ({ value }) => {
      const fullName = `${value.firstName} ${value.lastName}`.trim();
      const updatedData = {
        name: fullName,
        bio: value.bio,
        location: value.location,
        website_url: value.website_url,
      };
      await updateProfileMutation.mutateAsync(updatedData);
    },
  });

  return (
    <div className="w-full flex justify-center h-full pt-10">
      <div className="flex flex-col items-center gap-4 w-full">
        <div>
          <Avatar
            className={`size-18 relative ${uploadAvatarMutation.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={
              uploadAvatarMutation.isPending ? undefined : handleAvatarClick
            }
          >
            <AvatarImage
              src={user?.avatar_url || "/images/avatar/default_dp.png"}
            />
            <div className="bottom-0 absolute right-0 bg-secondary rounded-full p-0.5 border">
              {uploadAvatarMutation.isPending ? (
                <CircleNotchIcon
                  weight="bold"
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <PencilIcon
                  weight="duotone"
                  size={18}
                />
              )}
            </div>
          </Avatar>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={uploadAvatarMutation.isPending}
          />
        </div>

        <form
          className="w-full flex flex-col gap-4 justify-center px-6 py-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex w-full justify-between gap-4">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value ? "First name is required" : undefined,
              }}
            >
              {(field) => (
                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor={field.name}>First Name</Label>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      placeholder="Jane"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <InputGroupAddon>
                      <UserCircleIcon
                        size={32}
                        weight="duotone"
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
            <form.Field name="lastName">
              {(field) => (
                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor={field.name}>Last Name</Label>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      placeholder="Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <InputGroupAddon>
                      <UserCircleIcon
                        size={32}
                        weight="duotone"
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => (
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor={field.name}>Brief Bio</Label>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    placeholder="A short bio about you"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon>
                    <IdentificationCardIcon
                      size={32}
                      weight="duotone"
                    />
                  </InputGroupAddon>
                </InputGroup>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="location">
            {(field) => (
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor={field.name}>Your Location</Label>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    placeholder="Where are you from?"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon>
                    <MapPinAreaIcon
                      size={32}
                      weight="duotone"
                    />
                  </InputGroupAddon>
                </InputGroup>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="website_url">
            {(field) => (
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor={field.name}>Website URL</Label>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    placeholder="Your personal website or portfolio"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <InputGroupAddon>
                    <GlobeHemisphereWestIcon
                      size={32}
                      weight="duotone"
                    />
                  </InputGroupAddon>
                </InputGroup>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                size="lg"
                type="submit"
                disabled={!canSubmit || !!isSubmitting}
                className="mt-4"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
};

export default LeftPage;
