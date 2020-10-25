export default interface Message {
  value: string;
  show: boolean;
  severity: "success" | "error" | "info" | "warning";
}
