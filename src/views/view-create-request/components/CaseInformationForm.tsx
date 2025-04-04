import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "../interfaces";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const REQUESTER_TYPES = [
  { id: "juez", name: "Juez" },
  { id: "abogado", name: "Abogado" },
  { id: "particular", name: "Particular" },
];

const MOCK_USERS = {
  juez: [
    {
      id: "j1",
      name: "Carmen Rodríguez",
      region: "Metropolitana",
      tribunal: "1° Juzgado Civil de Santiago",
      ruc: "C-1234-2023",
      rit: "J-567-2023",
      rol: "JZ-001",
    },
    {
      id: "j2",
      name: "Miguel Ángel Pérez",
      region: "Valparaíso",
      tribunal: "Juzgado de Garantía de Valparaíso",
      ruc: "C-5678-2023",
      rit: "J-890-2023",
      rol: "JZ-002",
    },
    {
      id: "j3",
      name: "Ana María González",
      region: "Biobío",
      tribunal: "Tribunal de Familia de Concepción",
      ruc: "C-9012-2023",
      rit: "J-123-2023",
      rol: "JZ-003",
    },
  ],
  abogado: [
    {
      id: "a1",
      name: "Francisco Martínez",
      region: "Metropolitana",
      tribunal: "Corte de Apelaciones",
      ruc: "A-2345-2023",
      rit: "A-678-2023",
      rol: "AB-001",
    },
    {
      id: "a2",
      name: "Valentina Soto",
      region: "Antofagasta",
      tribunal: "2° Juzgado de Letras",
      ruc: "A-6789-2023",
      rit: "A-901-2023",
      rol: "AB-002",
    },
    {
      id: "a3",
      name: "Roberto Muñoz",
      region: "Los Lagos",
      tribunal: "Juzgado de Letras y Garantía",
      ruc: "A-0123-2023",
      rit: "A-234-2023",
      rol: "AB-003",
    },
  ],
  particular: [
    {
      id: "p1",
      name: "Claudia Vega",
      region: "Metropolitana",
      tribunal: "No aplica",
      ruc: "P-3456-2023",
      rit: "P-789-2023",
      rol: "PT-001",
    },
    {
      id: "p2",
      name: "Jorge Díaz",
      region: "O'Higgins",
      tribunal: "No aplica",
      ruc: "P-7890-2023",
      rit: "P-012-2023",
      rol: "PT-002",
    },
    {
      id: "p3",
      name: "Patricia Fuentes",
      region: "Maule",
      tribunal: "No aplica",
      ruc: "P-1234-2023",
      rit: "P-345-2023",
      rol: "PT-003",
    },
  ],
};

const CaseInformationForm = ({}: StepProps) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [selectedRequester, setSelectedRequester] = useState<string>("");
  const [formData, setFormData] = useState({
    region: "",
    tribunal: "",
    ruc: "",
    rit: "",
    rol: "",
  });
  const [loading, setLoading] = useState(false);
  const [availableRequesters, setAvailableRequesters] = useState<any[]>([]);

  // Simulate loading data when requester type changes
  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedRequester("");
      setFormData({
        region: "",
        tribunal: "",
        ruc: "",
        rit: "",
        rol: "",
      });

      // Simulate API call delay
      setTimeout(() => {
        setAvailableRequesters(
          MOCK_USERS[requesterType as keyof typeof MOCK_USERS] || []
        );
        setLoading(false);
      }, 600);
    } else {
      setAvailableRequesters([]);
    }
  }, [requesterType]);

  // Update form data when a specific requester is selected
  useEffect(() => {
    if (selectedRequester && requesterType) {
      const requesterData = MOCK_USERS[
        requesterType as keyof typeof MOCK_USERS
      ].find((user) => user.id === selectedRequester);

      if (requesterData) {
        setFormData({
          region: requesterData.region,
          tribunal: requesterData.tribunal,
          ruc: requesterData.ruc,
          rit: requesterData.rit,
          rol: requesterData.rol,
        });
      }
    }
  }, [selectedRequester, requesterType]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="requesterType">Tipo de Requiriente</Label>
        <Select value={requesterType} onValueChange={setRequesterType}>
          <SelectTrigger id="requesterType" className="w-full">
            <SelectValue placeholder="Seleccione un tipo de requiriente" />
          </SelectTrigger>
          <SelectContent>
            {REQUESTER_TYPES.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester">Requiriente</Label>
        <Select
          value={selectedRequester}
          onValueChange={setSelectedRequester}
          disabled={!requesterType || loading}
        >
          <SelectTrigger id="requester" className="w-full">
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Cargando requirientes...</span>
              </div>
            ) : (
              <SelectValue placeholder="Seleccione un requiriente" />
            )}
          </SelectTrigger>
          <SelectContent>
            {availableRequesters.map((requester) => (
              <SelectItem key={requester.id} value={requester.id}>
                {requester.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="region">Región</Label>
          <Input
            id="region"
            value={formData.region}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tribunal">Tribunal/Juzgado</Label>
          <Input
            id="tribunal"
            value={formData.tribunal}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">RUC</Label>
          <Input
            id="ruc"
            value={formData.ruc}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">RIT</Label>
          <Input
            id="rit"
            value={formData.rit}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Rol</Label>
          <Input
            id="rol"
            value={formData.rol}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseInformationForm;
