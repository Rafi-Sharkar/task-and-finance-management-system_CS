/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputField from "@/components/shared/dashboard/Form/InputField/InputField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const projectFormSchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  client: z.string().min(1, "Client name is required"),
  projectDescription: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  deadline: z.string().min(1, "Deadline is required"),
  document: z
    .any()
    .refine((file) => file instanceof File, "Please upload a document"),
  note: z.string().min(1, "Note is required"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const AddProjectForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("document", file, { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setValue("document", undefined as any, { shouldValidate: true });
  };

  const handleFormSubmit = (data: ProjectFormValues) => {
    console.log("Submitted Data:", data);
    alert("Project details and document saved successfully!");
    reset();
    setSelectedFile(null);
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="group mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#155DFC]"
      >
        <ArrowLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Projects
      </button>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={["item-1"]}
          className="space-y-4"
        >
          {/* Section 1: Project Details */}
          <AccordionItem
            value="item-1"
            className="rounded-md border bg-white px-4"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#155DFC] text-sm font-bold text-white">
                  1
                </span>
                <span className="text-lg font-semibold text-[#0A0D12]">
                  Project Details
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField
                  label="Project Name"
                  name="projectName"
                  placeholder="Enter project name"
                  register={register}
                  error={errors.projectName?.message}
                  required
                />
                <InputField
                  label="Client"
                  name="client"
                  placeholder="Enter client name"
                  register={register}
                  error={errors.client?.message}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  {...register("projectDescription")}
                  placeholder="Enter project Description"
                  className={`min-h-32 w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${errors.projectDescription ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.projectDescription.message}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 2: Timeline */}
          <AccordionItem
            value="item-2"
            className="rounded-md border bg-white px-4"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#155DFC] text-sm font-bold text-white">
                  2
                </span>
                <span className="text-lg font-semibold text-[#0A0D12]">
                  Timeline
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2">
              <InputField
                label="Start Date"
                name="startDate"
                type="date"
                register={register}
                error={errors.startDate?.message}
                required
              />
              <InputField
                label="Deadline"
                name="deadline"
                type="date"
                register={register}
                error={errors.deadline?.message}
                required
              />
            </AccordionContent>
          </AccordionItem>

          {/* Section 3: Attachments & Notes */}
          <AccordionItem
            value="item-3"
            className="rounded-md border bg-white px-4"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#155DFC] text-sm font-bold text-white">
                  3
                </span>
                <span className="text-lg font-semibold text-[#0A0D12]">
                  Attachments & Notes
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-5 border-t pt-4">
              {/* File Upload Logic */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Document
                </label>
                {!selectedFile ? (
                  <label
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-10 transition-colors hover:bg-gray-50 ${errors.document ? "border-red-500 bg-red-50" : "border-gray-200 py-4"}`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <UploadCloud
                      className={`mb-2 h-10 w-10 ${errors.document ? "text-red-400" : "text-gray-400"}`}
                    />
                    <p className="text-sm font-medium text-gray-600">
                      Upload a file
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      PDF, DOC up to 10MB
                    </p>
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="text-blue-600" />
                      <div>
                        <p className="max-w-48 truncate text-sm font-medium text-blue-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-blue-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="cursor-pointer rounded-full p-1 text-blue-600 hover:bg-blue-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                {errors.document && (
                  <p className="mt-2 text-xs text-red-500">
                    {String(errors.document.message)}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  {...register("note")}
                  placeholder="Add a note"
                  className={`min-h-28 w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${errors.note ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.note && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.note.message}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Button */}
        <Button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-md bg-[#155DFC] py-6 text-lg font-semibold text-white shadow-lg hover:bg-[#155DFC]"
        >
          {isSubmitting ? "Processing..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default AddProjectForm;
