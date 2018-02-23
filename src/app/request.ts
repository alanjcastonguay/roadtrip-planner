export class Request {

  constructor(
    public origin: string,
    public destination: string,
    public maximum_distance_km: number
  ) {}

}
