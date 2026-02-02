// export interface IFinanceVATReturn {
//   id: string;
//   vatPeriod: string;
//   outputVat: string;
//   inputVat: string;
//   netVat: string;
//   status: "Submit" | "Paid";
// }
export interface IFinanceVATReturn {
  id: string;
  period: string;       
  years: number;       
  outVat: number;      
  inVat: number;       
  netVat: number;
  vatStatus: string;   
}

// export const financeVATReturnsData: IFinanceVATReturn[] = [
//   {
//     id: "1",
//     vatPeriod: "Feb 2025",
//     outputVat: "$200",
//     inputVat: "$100",
//     netVat: "$300",
//     status: "Submit",
//   },
//   {
//     id: "2",
//     vatPeriod: "Mar 2025",
//     outputVat: "$600",
//     inputVat: "$100",
//     netVat: "$700",
//     status: "Submit",
//   },
//   {
//     id: "3",
//     vatPeriod: "Jan 2025",
//     outputVat: "$500",
//     inputVat: "$200",
//     netVat: "$700",
//     status: "Paid",
//   },
//   {
//     id: "4",
//     vatPeriod: "April 2025",
//     outputVat: "$650",
//     inputVat: "$50",
//     netVat: "$700",
//     status: "Paid",
//   },
// ];
