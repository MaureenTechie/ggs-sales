export type Customer = {
    id: string;
    name: string;
    type: "Business" | "Individual";
    phone: string;
    email: string;
    kraPin: string;
    location: string;
    balance: number;
    status: "Paid" | "Due";
  };
  
  export const defaultCustomers: Customer[] = [
    {
      id: "CUS-001",
      name: "ABC Farm Limited",
      type: "Business",
      phone: "0712 345 678",
      email: "info@abcfarm.co.ke",
      kraPin: "P051234567A",
      location: "Nairobi",
      balance: 145000,
      status: "Due",
    },
    {
      id: "CUS-002",
      name: "David Fresh Farms",
      type: "Business",
      phone: "0722 456 789",
      email: "david@freshfarms.co.ke",
      kraPin: "P051678901B",
      location: "Kiambu",
      balance: 0,
      status: "Paid",
    },
    {
      id: "CUS-003",
      name: "Kopia Kenya",
      type: "Business",
      phone: "0701 234 567",
      email: "procurement@kopia.co.ke",
      kraPin: "P051891234C",
      location: "Nairobi",
      balance: 45500,
      status: "Due",
    },
    {
      id: "CUS-004",
      name: "XYZ Limited",
      type: "Business",
      phone: "0798 345 612",
      email: "accounts@xyz.co.ke",
      kraPin: "P052341567D",
      location: "Nakuru",
      balance: 0,
      status: "Paid",
    },
    {
      id: "CUS-005",
      name: "John Mwangi",
      type: "Individual",
      phone: "0718 567 234",
      email: "johnmwangi@gmail.com",
      kraPin: "P052456789E",
      location: "Nairobi",
      balance: 18500,
      status: "Due",
    },
    {
      id: "CUS-006",
      name: "Green Valley Growers",
      type: "Business",
      phone: "0725 678 901",
      email: "info@greenvalley.co.ke",
      kraPin: "P052789123F",
      location: "Murang'a",
      balance: 0,
      status: "Paid",
    },
  ];