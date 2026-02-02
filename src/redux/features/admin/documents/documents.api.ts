import { apiClient } from "@/redux/apiClient/apiClient";

export const documentsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAllDocuments: builder.query({
      query: (queryParams) => ({
        url: "/documents",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Document"],
    }),

    getDocumentById: builder.query({
      query: (documentId) => ({
        url: `/documents/${documentId}`,
        method: "GET",
      }),
      providesTags: ["Document"],
    }),

    getDocumentsByFolder: builder.query({
      query: ({ folderId, ...queryParams }) => ({
        url: `/documents/folder/${folderId}`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Document"],
    }),

    getCurrentClientDocuments: builder.query({
      query: (queryParams) => ({
        url: "/documents/current/documents",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Document"],
    }),

    createDocument: builder.mutation({
      query: (formData) => ({
        url: "/documents",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),

    updateDocument: builder.mutation({
      query: ({ documentId, ...updateData }) => ({
        url: `/documents/${documentId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Document"],
    }),

    deleteDocument: builder.mutation({
      query: (documentId) => ({
        url: `/documents/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),

    shareDocumentToClient: builder.mutation({
      query: (shareData) => ({
        url: "/documents/share-to-client",
        method: "POST",
        body: shareData,
      }),
      invalidatesTags: ["Document"],
    }),

    updateDocumentStatusByClient: builder.mutation({
      query: (statusData) => ({
        url: "/documents/status-by-client",
        method: "PATCH",
        body: statusData,
      }),
      invalidatesTags: ["Document"],
    }),

    uploadSignedDocument: builder.mutation({
      query: ({ documentId, fileId, oldFileUrl, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        const encodedUrl = encodeURIComponent(oldFileUrl);

        return {
          url: `/documents/upload-signed/${documentId}/${fileId}/${encodedUrl}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Document"],
    }),
  }),
});

export const {
  useGetAllDocumentsQuery,
  useGetDocumentByIdQuery,
  useGetDocumentsByFolderQuery,
  useGetCurrentClientDocumentsQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useShareDocumentToClientMutation,
  useUpdateDocumentStatusByClientMutation,
  useUploadSignedDocumentMutation,
} = documentsApi;
