"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";

import profileImage from "@/assets/fallback-image/user-avatar.jpg";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";
import DeleteConfirmationModal from "@/components/shared/dashboard/DeleteConfirmationModal/DeleteConfirmationModal";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import TableSkeletonLoader from "@/components/shared/loader/TableSkeletonLoader/TableSkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRole } from "@/constants/userRole.constant";
import { useDeleteAction } from "@/hooks/useDeleteAction";
import useExportData from "@/hooks/useExportData";
import useSetSearchQueryInURL from "@/hooks/useSetSearchQueryInURL";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/user/user.api";
import { TColumn } from "@/types/custom-table.types";
import { IUser } from "@/types/userRole.types";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { formatDateTime } from "@/utils/formatDateTime";
import { Download, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const UserManagementTable = () => {
  //Redux Mutations & Queries
  //delete user mutation
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  //Update user mutation
  const [updateUser] = useUpdateUserMutation();

  //delete action hook
  const {
    deletedItemId,
    setDeletedItemId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    triggerDelete,
  } = useDeleteAction();

  //get and set all query params using hook in URL
  const { getQueryObject, setQuery, deleteQuery } = useSetSearchQueryInURL();
  //get query object from URL
  const query = getQueryObject();
  //get all users with query
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery(query);

  //Search Handler
  const handleSearchUsers = (search: string) => {
    if (search === "") {
      deleteQuery("search");
    } else {
      setQuery("search", search);
    }
  };

  //Pagination Meta
  const meta = {
    total: users?.data?.meta?.total || 0,
    page: users?.data?.meta?.page || 1,
    limit: users?.data?.meta?.limit || 10,
    totalPages: users?.data?.meta?.totalPages || 1,
  };

  //handle Delete User
  const handleDeleteConfirm = async () => {
    if (!deletedItemId) return;

    await catchAsyncMutation(deleteUser(deletedItemId).unwrap(), (res) => {
      toast.success(res?.message || "Item deleted successfully!");
      setIsDeleteModalOpen(false);
      setDeletedItemId(null);
    });
  };

  //  Handle Role Change
  const handleRoleChange = async (userId: string, newRole: string) => {
    await catchAsyncMutation(
      updateUser({
        id: userId,
        data: { role: newRole },
      }).unwrap(),
      () => {
        toast.success("User role updated successfully!");
      },
      (error) => {
        toast.error(error?.message || "Failed to update role");
      }
    );
  };

  const { exportToCSV } = useExportData({
    fileName: "User Management",
  });

  const handleExport = () => {
    const dataToExport = users?.data?.data || [];
    exportToCSV(dataToExport);
  };

  //Table Config
  const userTableConfig: TColumn<IUser>[] = [
    {
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src={row?.avatarUrl || profileImage}
              alt={row?.username}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />

            {/* <span
              className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white ${row?.status === "Active"
                ? "bg-[#17B26A]"
                : row?.status === "Pending"
                  ? "bg-[#C98904]"
                  : "bg-[#D5D7DA]"
                }`}
            /> */}
          </div>
          <div>
            <p className="font-semibold text-black">
              {row?.fullName || row?.username || "N/A"}
            </p>
            <p className="text-sm text-[#737373]">{row?.username}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
    },
    // {
    //   header: "Password",
    //   cell: (row) => (
    //     <div className="flex items-center gap-2 text-sm text-[#737373]">
    //       <span className="min-w-20 font-mono">
    //         {showPasswords[row?.id] ? "pass1234" : "********"}
    //       </span>
    //       <button
    //         onClick={() => togglePassword(row?.id)}
    //         className="cursor-pointer text-sm text-[#737373]"
    //       >
    //         {showPasswords[row?.id] ? <Eye size={16} /> : <EyeOff size={16} />}
    //       </button>
    //     </div>
    //   ),
    // },
    {
      header: "Role",
      cell: (row) => (
        <Select defaultValue={row?.role} onValueChange={(value) => handleRoleChange(row.id, value)}>
          <SelectTrigger className="h-6 w-full cursor-pointer border-[#D5D7DA]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={userRole.ADMIN}>Admin</SelectItem>
            <SelectItem value={userRole.MANAGER}>Manager</SelectItem>
            <SelectItem value={userRole.EMPLOYEE}>Employee</SelectItem>
            <SelectItem value={userRole.CLIENT}>Client</SelectItem>
            <SelectItem value={userRole.FINANCE}>Finance</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Status",
      cell: (row) => {
        const statusColorMap: Record<string, { bg: string; text: string }> = {
          ACTIVE: { bg: "#B7E2C7", text: "#0C5A29" },
          PENDING: { bg: "#EEDAB1", text: "#6F4B02" },
          INACTIVE: { bg: "#D5D7DA", text: "#252B37" },
        };

        const colors =
          statusColorMap[row.accountStatus] || statusColorMap.INACTIVE;
        return (
          <StatusBadge
            status={row.accountStatus}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
    {
      header: "Last Active",
      cell: (row) => {
        return (
          <span className="text-sm text-[#737373]">
            {formatDateTime(row?.lastActive)}
          </span>
        );
      },
    },
    {
      header: "Created At",
      cell: (row) => {
        return (
          <span className="text-sm text-[#737373]">
            {formatDateTime(row?.createdAt)}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer text-[#414651] transition-colors hover:text-[#181D27]"
          >
            <SquarePen size={18} />
          </button> */}
          <button
            onClick={() => triggerDelete(row?.id)}
            className="cursor-pointer text-[#E35252] transition-colors hover:text-[#C93333]"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-5 pb-20">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            value={query.search || ""}
            placeholder="Search users..."
            onChange={(e) => handleSearchUsers(e.target.value)}
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Export Button */}
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          {/* Filter Popover */}
          {/* <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <ListFilter size={18} /> Filter
          </Button> */}
        </div>
      </div>

      {(isLoading || isFetching) && <TableSkeletonLoader />}

      {!isLoading && !isFetching && !users?.data?.data?.length && (
        <EmptyState
          title="No users found"
          description="No users match your current search or filter criteria."
          className="rounded-xl border bg-white"
        />
      )}

      {!isLoading && !isFetching && users?.data?.data?.length > 0 && (
        <CustomTable columns={userTableConfig} data={users?.data?.data} />
      )}

      {
        users?.data?.data?.length > 0 && <CustomPagination meta={meta} />
      }

      {/* Edit User Modal */}
      {/* {isEditModalOpen && selectedUser && (
        <DynamicModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="Edit User"
        >
          <EditUserForm
            onClose={handleCloseEditModal}
            userData={{
              id: selectedUser?.id,
              username: selectedUser?.username,
              email: selectedUser?.email,
              password: "pass1234",
              role: selectedUser?.role.toLowerCase(),
            }}
          />
        </DynamicModal>
      )} */}

      {/* Delete Modal  */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UserManagementTable;
