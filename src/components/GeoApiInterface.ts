export interface GeocodeResponse {
  results: GeocodeResult[]
  status: string
}

export interface GeocodeResult {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  types: string[]
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface Geometry {
  bounds: Bounds
  location: LatLng
  location_type: string
  viewport: Bounds
}

export interface Bounds {
  northeast: LatLng
  southwest: LatLng
}

export interface LatLng {
  lat: number
  lng: number
}
