export interface Carrier {
  id: number;
  fullName: string;
  socialName: string;
  nationality: string;
  countryCode: string;
  maritalStatus: string;
  gender: string;
  run: string;
  phone: string;
  typeCurrent: string;
  birthDate: string;
  penaltyType: string;
  appealsCourt: string;
  courtRegion: string;
  court: string;
  ruc: string;
  rit: string;
  rol: string;
  crs: string;
  inclusionExclusionAreas: string;
  measureDuration: string;
  controlSchedule: string;
  effectiveControlPeriod: string;
  feasibilityRequests: string;
  sentence: string;
  installationProgramming: string;
  installationsPerformed: string;
  modificationResolutions: string;
  technicalSupports: string;
  nonComplianceReports: string;
  controlDays: string;
  uninstallations: string;
}

export interface Request {
  requester_type: string;
  requester_name: string;
  identification_number: string;
  situation_type: string;
  request_date: string;
  response_date: string;
  status: string;
  confirmation: string;
  hour: string;
  requesterType: string;
  region: string;
  tribunalCourt: string;
  crime: string;
  lastName: string;
  maternalLastName: string;
  firstName: string;
  isForeigner: boolean;
  street: string;
  number: string;
  blockApartmentHouse: string;
  commune: string;
  highwayRouteKilometer: string;
  populationCondominiumVilla: string;
  postalCode: string;
  geographicCoordinates: string;
  radius: string;
  complianceSchedule: string;
  sectorCharacteristics: string;
  victimLastName: string;
  victimMaternalLastName: string;
  victimFirstName: string;
  victimRut: string;
  victimEmail: string;
  victimPhone: string;
  victimWorkPhone: string;
}
