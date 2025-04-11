"use client";

import { useState } from "react";
import { PlusCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownFilter } from "@/components";

interface DeviceStock {
  id: string;
  region: string;
  aggressorDevice: number;
  obcCharger: number;
  obdAdapter: number;
  beacon: number;
  victimDevice: number;
  victimCharger: number;
  lastUpdated: Date;
  notes: string;
}

const filters = [{ id: 1, name: "Región" }];

export default function ViewDeviceStock() {
  const [idFilter, setIdFilter] = useState(1);
  const [stocks, setStocks] = useState<DeviceStock[]>(() => {
    // Generate sample stock records for different regions
    return [
      {
        id: "1",
        region: "Norte",
        aggressorDevice: 15,
        obcCharger: 12,
        obdAdapter: 10,
        beacon: 8,
        victimDevice: 20,
        victimCharger: 18,
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: "Stock actualizado después del último envío a Barranquilla.",
      },
      {
        id: "2",
        region: "Sur",
        aggressorDevice: 8,
        obcCharger: 7,
        obdAdapter: 5,
        beacon: 4,
        victimDevice: 10,
        victimCharger: 9,
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        notes: "Se requiere reposición de adaptadores OBD.",
      },
      {
        id: "3",
        region: "Este",
        aggressorDevice: 12,
        obcCharger: 10,
        obdAdapter: 8,
        beacon: 6,
        victimDevice: 15,
        victimCharger: 14,
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        notes: "Inventario completo después de la última auditoría.",
      },
      {
        id: "4",
        region: "Oeste",
        aggressorDevice: 6,
        obcCharger: 4,
        obdAdapter: 3,
        beacon: 2,
        victimDevice: 8,
        victimCharger: 7,
        lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        notes:
          "Stock bajo, se ha solicitado reposición de todos los dispositivos.",
      },
      {
        id: "5",
        region: "Central",
        aggressorDevice: 25,
        obcCharger: 22,
        obdAdapter: 20,
        beacon: 18,
        victimDevice: 30,
        victimCharger: 28,
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: "Stock principal con disponibilidad para todas las regiones.",
      },
    ];
  });

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsStock, setDetailsStock] = useState<DeviceStock | null>(null);

  const [newStock, setNewStock] = useState<Partial<DeviceStock>>({
    lastUpdated: new Date(),
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const handleCreateStock = () => {
    if (
      !newStock.region ||
      newStock.aggressorDevice === undefined ||
      newStock.obcCharger === undefined ||
      newStock.obdAdapter === undefined ||
      newStock.beacon === undefined ||
      newStock.victimDevice === undefined ||
      newStock.victimCharger === undefined
    ) {
      return;
    }

    const stock: DeviceStock = {
      id: Date.now().toString(),
      region: newStock.region,
      aggressorDevice: Number(newStock.aggressorDevice),
      obcCharger: Number(newStock.obcCharger),
      obdAdapter: Number(newStock.obdAdapter),
      beacon: Number(newStock.beacon),
      victimDevice: Number(newStock.victimDevice),
      victimCharger: Number(newStock.victimCharger),
      lastUpdated: newStock.lastUpdated || new Date(),
      notes: newStock.notes || "",
    };

    setStocks([...stocks, stock]);
    setNewStock({
      lastUpdated: new Date(),
    });
    setOpenNewDialog(false);
  };

  const handleOpenDetailsDialog = (stock: DeviceStock) => {
    setDetailsStock(stock);
    setOpenDetailsDialog(true);
  };

  // Function to determine stock status color
  const getStockStatusColor = (quantity: number) => {
    if (quantity <= 3) return "destructive";
    if (quantity <= 7) return "warning";
    return "default";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Stock de Dispositivos por Región
        </CardTitle>
        <div className="flex gap-2">
          <Input
            maxLength={30}
            placeholder={`Buscar por ${filters
              .find((i) => i.id === idFilter)
              ?.name.toLowerCase()}`}
          />
          <DropdownFilter
            filters={filters}
            idFilter={idFilter}
            setIdFilter={setIdFilter}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Dialog open={openNewDialog} onOpenChange={setOpenNewDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Stock
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nuevo Registro de Stock</DialogTitle>
                <DialogDescription>
                  Complete los detalles para registrar el stock de dispositivos
                  para una región.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="region">Región</Label>
                  <Input
                    id="region"
                    value={newStock.region || ""}
                    onChange={(e) =>
                      setNewStock({ ...newStock, region: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="aggressorDevice">Dispositivo Agresor</Label>
                    <Input
                      id="aggressorDevice"
                      type="number"
                      min="0"
                      value={newStock.aggressorDevice || ""}
                      onChange={(e) =>
                        setNewStock({
                          ...newStock,
                          aggressorDevice: +e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="obcCharger">Cargador OBC</Label>
                    <Input
                      id="obcCharger"
                      type="number"
                      min="0"
                      value={newStock.obcCharger || ""}
                      onChange={(e) =>
                        setNewStock({
                          ...newStock,
                          obcCharger: +e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="obdAdapter">Adaptador OBD</Label>
                    <Input
                      id="obdAdapter"
                      type="number"
                      min="0"
                      value={newStock.obdAdapter || ""}
                      onChange={(e) =>
                        setNewStock({
                          ...newStock,
                          obdAdapter: +e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="beacon">BEACON</Label>
                    <Input
                      id="beacon"
                      type="number"
                      min="0"
                      value={newStock.beacon || ""}
                      onChange={(e) =>
                        setNewStock({ ...newStock, beacon: +e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="victimDevice">Dispositivo Víctima</Label>
                    <Input
                      id="victimDevice"
                      type="number"
                      min="0"
                      value={newStock.victimDevice || ""}
                      onChange={(e) =>
                        setNewStock({
                          ...newStock,
                          victimDevice: +e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="victimCharger">Cargador Víctima</Label>
                    <Input
                      id="victimCharger"
                      type="number"
                      min="0"
                      value={newStock.victimCharger || ""}
                      onChange={(e) =>
                        setNewStock({
                          ...newStock,
                          victimCharger: +e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={newStock.notes || ""}
                    onChange={(e) =>
                      setNewStock({ ...newStock, notes: e.target.value })
                    }
                    placeholder="Observaciones sobre el stock"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenNewDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateStock}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Región</TableHead>
                  <TableHead>Dispositivo Agresor</TableHead>
                  <TableHead>Cargador OBC</TableHead>
                  <TableHead>Adaptador OBD</TableHead>
                  <TableHead>BEACON</TableHead>
                  <TableHead>Dispositivo Víctima</TableHead>
                  <TableHead>Cargador Víctima</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No hay registros de stock disponibles
                    </TableCell>
                  </TableRow>
                ) : (
                  stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-medium">
                        {stock.region}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockStatusColor(stock.aggressorDevice)}
                        >
                          {stock.aggressorDevice}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.obcCharger)}>
                          {stock.obcCharger}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.obdAdapter)}>
                          {stock.obdAdapter}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.beacon)}>
                          {stock.beacon}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockStatusColor(stock.victimDevice)}
                        >
                          {stock.victimDevice}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockStatusColor(stock.victimCharger)}
                        >
                          {stock.victimCharger}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetailsDialog(stock)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <DetailsDialog
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
            stock={detailsStock}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stock: DeviceStock | null;
}

function DetailsDialog({ open, onOpenChange, stock }: DetailsDialogProps) {
  if (!stock) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Stock - Región {stock.region}</DialogTitle>
          <DialogDescription>
            Información completa del inventario de dispositivos en esta región.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Inventario de Dispositivos:</h3>
            <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">
                  Dispositivo Agresor:
                </p>
                <p className="font-medium text-lg">{stock.aggressorDevice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cargador OBC:</p>
                <p className="font-medium text-lg">{stock.obcCharger}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adaptador OBD:</p>
                <p className="font-medium text-lg">{stock.obdAdapter}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BEACON:</p>
                <p className="font-medium text-lg">{stock.beacon}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Dispositivo Víctima:
                </p>
                <p className="font-medium text-lg">{stock.victimDevice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Cargador Víctima:
                </p>
                <p className="font-medium text-lg">{stock.victimCharger}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Última actualización:</h3>
            <p>
              {format(stock.lastUpdated, "dd/MM/yyyy HH:mm", { locale: es })}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Notas:</h3>
            <p className="whitespace-pre-wrap">{stock.notes}</p>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Estado del inventario:</h3>
            <div className="space-y-2">
              {stock.aggressorDevice <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Dispositivos Agresores
                </p>
              )}
              {stock.obcCharger <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Cargadores OBC
                </p>
              )}
              {stock.obdAdapter <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Adaptadores OBD
                </p>
              )}
              {stock.beacon <= 3 && (
                <p className="text-destructive">⚠️ Nivel crítico de BEACONs</p>
              )}
              {stock.victimDevice <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Dispositivos Víctima
                </p>
              )}
              {stock.victimCharger <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Cargadores Víctima
                </p>
              )}
              {stock.aggressorDevice > 3 &&
                stock.obcCharger > 3 &&
                stock.obdAdapter > 3 &&
                stock.beacon > 3 &&
                stock.victimDevice > 3 &&
                stock.victimCharger > 3 && (
                  <p className="text-success">
                    ✅ Niveles de inventario adecuados
                  </p>
                )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
