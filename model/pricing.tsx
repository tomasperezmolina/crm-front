import { LicenseType, ProgramType } from "./opportunity";

export function licensePrice(program: ProgramType, license: LicenseType) {
  switch (program) {
    case 'Excel':
      switch (license) {
        case 'Home': return 40;
        case 'Pro': return 65;
      }
    case 'Outlook':
      switch (license) {
        case 'Home': return 20;
        case 'Pro': return 25;
      }
    case 'PowerPoint':
      switch (license) {
        case 'Home': return 30;
        case 'Pro': return 50;
      }
    case 'Word':
      switch (license) {
        case 'Home': return 35;
        case 'Pro': return 45;
      }
  }
}
