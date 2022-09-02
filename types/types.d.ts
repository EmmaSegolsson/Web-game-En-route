import initialRoutes from "../backend/src/game/initialRoutes";

export type SocketResponse<T> = {
  success: boolean;
  message?: string;
  payload: T;
};

type CreateJoinSocketPayload = {
  gameToken: string;
  player: PlayerClient;
};

export type AddSocketEmit = {
  gameToken: string;
  playerId: string;
};

export type AddSocketPayload = string;

type PlayerClient = {
  playerId: string;
  color: PlayerColor;
  nickname: string;
  remainingTracks: number;
  haveChosenTickets: boolean;
  points: number;
  creator: boolean;
};

export type SocketEvent =
  | "add_socket"
  | "pick_initial_tickets"
  | "open_track_cards"
  | "tickets"
  | "track_cards"
  | "setup_game"
  | "players"
  | "build_route"
  | "pick_card_from_openTrackCards"
  | "pick_card_from_trackCards";

export type PlayerTrackCard = {
  color: TrackColor;
  amount: number;
};

export type PlayerTrackCards = {
  [color in TrackColor]: PlayerTrackCard;
};

export type PlayerAction = "none" | "built_route" | "picked_track_card";

export type Ticket = {
  start: City;
  end: City;
  points: number;
};

export type TrackColor =
  | "blue"
  | "orange"
  | "red"
  | "black"
  | "white"
  | "green"
  | "yellow"
  | "pink"
  | "bridge";

export type RouteColor =
  | "blue"
  | "orange"
  | "red"
  | "black"
  | "white"
  | "green"
  | "yellow"
  | "pink"
  | "any";

export type GameRoute = {
  builtBy: PlayerColor | null;
  color: RouteColor;
  bridges: number;
  length: number;
};

export type GameRoutes = {
  [routeId in Route]: GameRoute;
};

export type PlayerColor = "black" | "blue" | "red" | "green" | "yellow";

export type City =
  | "edinburgh"
  | "warszawa"
  | "gdansk"
  | "copenhagen"
  | "stockholm"
  | "riga"
  | "moscow"
  | "voronezh"
  | "kharkiv"
  | "smolensk"
  | "rostov"
  | "kyiv"
  | "vilnius"
  | "sochi"
  | "sevastopol"
  | "erzurum"
  | "ankara"
  | "izmir"
  | "athens"
  | "istanbul"
  | "sofia"
  | "bucharest"
  | "budapest"
  | "vienna"
  | "sarajevo"
  | "zagreb"
  | "venice"
  | "bari"
  | "palermo"
  | "rome"
  | "marseille"
  | "zurich"
  | "paris"
  | "brest"
  | "le_havre"
  | "brussels"
  | "amsterdam"
  | "london"
  | "pamplona"
  | "barcelona"
  | "madrid"
  | "lisbon"
  | "malaga"
  | "munich"
  | "frankfurt"
  | "berlin"
  | "bremen";

export type Route =
  | "edin_lond_1"
  | "edin_lond_2"
  | "amst_lond_1"
  | "leha_lond_1"
  | "leha_lond_2"
  | "bres_leha_1"
  | "bres_pari_1"
  | "leha_pari_1"
  | "bres_pamp_1"
  | "pamp_pari_1"
  | "pamp_pari_2"
  | "brus_leha_1"
  | "amst_brus_1"
  | "brus_pari_1"
  | "brus_pari_2"
  | "amst_brem_1"
  | "brus_fran_1"
  | "amst_fran_1"
  | "fran_pari_1"
  | "fran_pari_2"
  | "fran_muni_1"
  | "brem_cope_1"
  | "brem_cope_2"
  | "cope_stoc_1"
  | "cope_stoc_2"
  | "mosc_stoc_1"
  | "mosc_riga_1"
  | "gdan_riga_1"
  | "mosc_voro_1"
  | "khar_voro_1"
  | "khar_kyiv_1"
  | "khar_rost_1"
  | "rost_seva_1"
  | "rost_soch_1"
  | "seva_soch_1"
  | "mosc_viln_1"
  | "riga_viln_1"
  | "viln_wars_1"
  | "kyiv_smol_1"
  | "kyiv_viln_1"
  | "viln_smol_1"
  | "smol_voro_1"
  | "kyiv_wars_1"
  | "gdan_wars_1"
  | "berl_gdan_1"
  | "berl_brem_1"
  | "brem_fran_1"
  | "madr_pamp_2"
  | "madr_pamp_1"
  | "lisb_madr_1"
  | "lisb_mala_1"
  | "madr_mala_1"
  | "barc_madr_1"
  | "barc_pamp_1"
  | "barc_mars_1"
  | "mars_pari_1"
  | "mars_pamp_1"
  | "pari_zuri_1"
  | "muni_zuri_1"
  | "muni_vien_1"
  | "muni_veni_1"
  | "mars_rome_1"
  | "veni_zagr_1"
  | "vien_zagr_1"
  | "veni_zuri_1"
  | "mars_zuri_1"
  | "rome_veni_1"
  | "berl_fran_1"
  | "berl_fran_2"
  | "pale_rome_1"
  | "bari_pale_1"
  | "athe_bari_1"
  | "berl_vien_1"
  | "bari_rome_1"
  | "berl_wars_1"
  | "berl_wars_2"
  | "vien_wars_1"
  | "sara_zagr_1"
  | "buda_vien_1"
  | "buda_vien_2"
  | "buda_kyiv_1"
  | "buch_kyiv_1"
  | "buch_buda_1"
  | "buch_seva_1"
  | "buda_sara_1"
  | "sara_sofi_1"
  | "buch_sofi_1"
  | "buda_zagr_1"
  | "erzu_seva_1"
  | "ista_seva_1"
  | "anka_ista_1"
  | "ista_izmi_1"
  | "athe_izmi_1"
  | "izmi_pale_1"
  | "athe_sara_1"
  | "athe_sofi_1"
  | "ista_sofi_1"
  | "buch_ista_1"
  | "anka_izmi_1"
  | "anka_erzu_1";
