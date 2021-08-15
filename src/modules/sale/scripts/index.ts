import InsertedShipmentRetroactive from './InsertedShipmentRetroactive';

export default class ShipmentsScript {
  public async execute(): Promise<void> {
    await new InsertedShipmentRetroactive().execute;
  }
}
