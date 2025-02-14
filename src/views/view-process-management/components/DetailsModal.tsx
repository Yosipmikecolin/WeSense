import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Data {
  [key: string]: string | number | boolean | null;
}

interface Props {
  title: string;
  data?: Data;
  open: boolean;
  onClose: VoidFunction;
  fields: { key: string; label: string }[];
}

const DetailsModal = ({ title, data, open, onClose, fields }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {data &&
            fields.map(({ key, label }) => (
              <div
                key={key}
                className="flex justify-between items-center pb-4 border-b flex-wrap"
              >
                <span className="text-sm text-gray-500">{label}</span>
                <span className="font-medium">
                  {String(data[key] ?? "N/A")}
                </span>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
