"use client";

import { useGetUserByIdQuery } from "@/api/users.api";
import { useParams, useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const ClientPageById = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id as string);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center gap-6 text-center px-4">
        <div className="p-4 bg-destructive/10 rounded-full">
          <Building2 className="size-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Client Not Found
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            We couldn't find the client profile you're looking for. It may have
            been moved or deleted.
          </p>
        </div>
        <Button onClick={() => router.push("/clients")} size="lg">
          <ArrowLeft className="mr-2 size-4" />
          Back to Client List
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[1440px] mx-auto p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className=" bg-card border rounded-3xl shadow-sm">
              <div className="px-6 pb-8 mt-4 text-center">
                <div className="inline-block relative">
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="size-28 rounded-2xl object-cover border-4 shadow-xl mb-4"
                  />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {user.fullName}
                </h1>
                <p className="text-[#4F46E5] font-semibold text-sm mt-1 uppercase ">
                  {user.company.title}
                </p>
              </div>

              <div className="border-t px-6 py-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Client ID</span>
                  <span className="font-mono font-medium">
                    #{user?.id?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="size-2 bg-indigo-400 rounded-full" />
                <h2 className="text-lg font-bold tracking-tight">
                  Contact Information
                </h2>
              </div>

              <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-8 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#4F46E5]/10 rounded-2xl">
                        <Mail className="size-6 text-[#4F46E5]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Email Address
                        </p>
                        <p className="text-lg font- max-w-[100px] truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#4F46E5]/10 rounded-2xl">
                        <Phone className="size-6 text-[#4F46E5]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Phone Number
                        </p>
                        <p className="text-lg font-medium font- max-w-[100px] truncate">
                          {user.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-t hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#4F46E5]/10 rounded-2xl">
                      <MapPin className="size-6 text-[#4F46E5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Office Location
                      </p>
                      <p className="text-lg font-medium">
                        {user.address || "No address"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="size-2 bg-[#4F46E5] rounded-full" />
                <h2 className="text-lg font-bold tracking-tight">
                  Client Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-card border rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#4F46E5]/10 rounded-xl">
                      <Building2 className="size-5 text-[#4F46E5]" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Work Details
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Company
                      </p>
                      <p className="font-semibold text-lg">
                        {user.company.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Department
                      </p>
                      <p className="font-medium">{user.company.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPageById;
