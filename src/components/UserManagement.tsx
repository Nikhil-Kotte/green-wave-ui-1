import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/UserTable";
import { UserDialog } from "@/components/UserDialog";
import { UserPlus } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  avatar?: string;
  status: "active" | "inactive";
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Green",
    email: "sarah.green@ecoteam.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Mike Forest",
    email: "mike.forest@ecoteam.com",
    role: "Editor",
    status: "active",
  },
  {
    id: "3",
    name: "Emma Rivers",
    email: "emma.rivers@ecoteam.com",
    role: "Viewer",
    status: "active",
  },
  {
    id: "4",
    name: "David Woods",
    email: "david.woods@ecoteam.com",
    role: "Editor",
    status: "inactive",
  },
];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleSaveUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6 animate-grow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Team Members</h2>
            <p className="text-muted-foreground">Manage your eco-conscious team</p>
          </div>
          <Button 
            onClick={handleAddUser}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>

        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      <UserDialog
        user={editingUser}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveUser}
      />
    </div>
  );
};
