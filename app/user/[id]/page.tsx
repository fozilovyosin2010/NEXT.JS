"use client";

import { getById, usegetByIdQuery } from "@/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SpinnerCom } from "@/components/Loader";
import { Idata } from "@/api/types.api";

const UserById = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = usegetByIdQuery(id as string);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <SpinnerCom />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 space-y-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center max-w-sm w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            User Not Found
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            We couldn't find the user you're looking for. They may have been
            deleted or the ID is incorrect.
          </p>
          <Button
            variant="default"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground hover:bg-white border-transparent hover:border-gray-200 border transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Public Profile
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-1 bg-white rounded-2xl shadow-md">
                <div className="h-24 w-24 rounded-xl bg-gray-900 flex items-center justify-center text-white text-3xl font-bold">
                  {data.name.charAt(0)}
                </div>
              </div>
              <div className="pb-2">
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                    data.status
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-gray-50 text-gray-600 border-gray-100"
                  }`}
                >
                  {data.status ? "● ACTIVE" : "● INACTIVE"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {data.name}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-2" />
                <span className="font-medium">{data.job}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-2" />
                <span>{data.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Detailed Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </p>
                  <p className="font-medium text-gray-900">{data.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Current Age
                  </p>
                  <p className="font-medium text-gray-900">
                    {data.age} years old
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    City / Location
                  </p>
                  <p className="font-medium text-gray-900">{data.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Work Email
                  </p>
                  <p className="font-medium text-gray-900 text-sm">
                    {data.name.toLowerCase().replace(" ", ".")}@company.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
                System Metadata
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-500 space-y-2">
                <div className="flex justify-between">
                  <span>Unique Identifier:</span>
                  <span className="text-gray-900">{data.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <span
                    className={data.status ? "text-green-600" : "text-gray-600"}
                  >
                    {data.status ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Professional Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-blue-50 rounded-lg">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase">
                      Role
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {data.job}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="font-bold mb-2">Need to update info?</h3>
              <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                You can modify this user's details directly from the management
                table.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push("/")}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none"
              >
                Go to Table
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserById;
