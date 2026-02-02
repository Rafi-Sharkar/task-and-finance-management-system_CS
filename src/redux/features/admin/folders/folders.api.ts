/* eslint-disable @typescript-eslint/no-explicit-any */
 import { apiClient } from "@/redux/apiClient/apiClient";

export interface BreadcrumbStep {
  id: string;
  name: string;
}

export interface FileType {
  id: string;
  url: string;
  mimeType: string;
  sizeKB: number;
  extension: string;
  uploadedAt: string;
}

export interface DocumentType {
  id: string;
  name: string;
  files: FileType[];
}

export interface FolderType {
  id: string;
  name: string;
  parentId: string | null;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  breadcrumb?: BreadcrumbStep[];
  children?: FolderType[];
  documents?: DocumentType[];
}


export interface FolderApiResponse {
  success: boolean;
  message: string;
  data: FolderType[];
}

export interface SingleFolderApiResponse {
  success: boolean;
  message: string;
  data: FolderType;
}

export const foldersApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation<
      SingleFolderApiResponse,
      Partial<FolderType>
    >({
      query: (data) => ({
        url: "/folders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Folder"],
    }),

    getAllFolders: builder.query<FolderApiResponse, void>({
      query: () => ({
        url: "/folders",
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),

    getChildFolders: builder.query<any, string>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),

    updateFolderName: builder.mutation<
      SingleFolderApiResponse,
      { id: string; data: { name: string } }
    >({
      query: ({ id, data }) => ({
        url: `/folders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Folder"],
    }),

    deleteFolder: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/folders/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: ["Folder"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetAllFoldersQuery,
  useGetChildFoldersQuery,
  useUpdateFolderNameMutation,
  useDeleteFolderMutation,
} = foldersApi;
