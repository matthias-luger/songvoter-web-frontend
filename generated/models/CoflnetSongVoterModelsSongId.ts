/* tslint:disable */
/* eslint-disable */
/**
 * Songvoter
 * Songvoter
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: support@coflnet.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CoflnetSongVoterModelsSongId
 */
export interface CoflnetSongVoterModelsSongId {
    /**
     * 
     * @type {string}
     * @memberof CoflnetSongVoterModelsSongId
     */
    id?: string | null;
}

/**
 * Check if a given object implements the CoflnetSongVoterModelsSongId interface.
 */
export function instanceOfCoflnetSongVoterModelsSongId(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CoflnetSongVoterModelsSongIdFromJSON(json: any): CoflnetSongVoterModelsSongId {
    return CoflnetSongVoterModelsSongIdFromJSONTyped(json, false);
}

export function CoflnetSongVoterModelsSongIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): CoflnetSongVoterModelsSongId {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function CoflnetSongVoterModelsSongIdToJSON(value?: CoflnetSongVoterModelsSongId | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

