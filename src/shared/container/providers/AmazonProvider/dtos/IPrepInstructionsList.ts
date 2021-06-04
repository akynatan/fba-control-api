interface IPrepInstructions {
  ASIN: string;
  BarcodeInstruction: string;
  PrepGuidance: string;
  PrepInstructionList: string[];
}

export default interface IPrepInstructionsList {
  ASINPrepInstructionsList: IPrepInstructions[];
}
