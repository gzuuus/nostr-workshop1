import type { NDKEvent } from "@nostr-dev-kit/ndk";
import {nip19} from "nostr-tools";
import type { AddressPointer, EventPointer } from "nostr-tools/nip19";
export function unixToDate(unixTimestamp: number | undefined) {
    if (unixTimestamp === undefined) {
      return "";
    }
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(unixTimestamp * 1000).toLocaleString("en-US", options);
}

// export function buildEventPointer(
//     id: string | undefined = "",
//     relays: string[] | undefined = [],
//     author: string,
//     kind?: number,
//     identifier: string | undefined = ""
//   ) {
//     let objPointer: any;
//     let encodedPointer: string = "";
//     if (kind === 1) {
//       objPointer = {
//         id: id,
//         relays: relays,
//         author: author,
//       };
//       return (encodedPointer = nip19.neventEncode(objPointer));
//     } else if (kind === 30023 || kind === 30001) {
//       objPointer = {
//         identifier: identifier,
//         pubkey: author,
//         kind: kind,
//         relays: relays,
//       };
//       return (encodedPointer = nip19.naddrEncode(objPointer));
//     }
//   }

  export function buildEventPointer( event:NDKEvent) {

    let objPointer: EventPointer | AddressPointer;
    let encodedPointer: string = "";
    if (event.kind === 1) {
      objPointer = {
        id: event.id,
        relays: [],
        author: event.author.pubkey,
      };
      return (encodedPointer = nip19.neventEncode(objPointer));
    } else if (event.kind === 30023) {
      objPointer = {
        identifier: event.tagValue('d')!,
        pubkey: event.author.pubkey,
        kind: event.kind,
        relays: [],
      };
      return (encodedPointer = nip19.naddrEncode(objPointer));
    }
  }