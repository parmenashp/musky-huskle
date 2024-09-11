import {GrpcWebFetchTransport} from '@protobuf-ts/grpcweb-transport'
import { MembersServiceClient } from '../api/proto/members.client'
import { GetMemberRequest } from '../api/proto/members';
import { GameMemberData } from "./types";

const transport = new GrpcWebFetchTransport({
    baseUrl: "http://k8s.back"
})

const server = new MembersServiceClient(transport);

export default async function fetchMember(name: string): Promise<GameMemberData[]> {
    var request = GetMemberRequest.create()

    request.memberName = name

    console.log("Making gRPC call for getMembers with", name)

    const result = await server.getMembers(request);

    console.log("Call to gRPC server finished.", result)
    return [{
        avatar: {
            name: result.response.name,
            avatarUrl: result.response.avatarUrl
        },
        gender: {
            value: result.response.genreIdentity?.value,
            status: result.response.genreIdentity?.status,
        },
        age: {
            value: Number(result.response.age?.value),
            status: result.response.age?.status,
        },
        fursonaSpecies: {
            value: [result.response.fursonaSpecies?.value ?? "undefined"],
            status: result.response.fursonaSpecies?.status
        },
        fursonaColor: {
            value: result.response.color?.value,
            status: result.response.color?.status,
        },
        workArea: {
            value: [result.response.occupation?.value ?? "undefined"],
            status: result.response.occupation?.status,
        },
        sexuality: {
            value: result.response.sexuality?.value,
            status: result.response.sexuality?.status
        },
        zodiacSign: {
            value: result.response.sign?.value,
            status: result.response.sign?.status
        },
        memberSince: {
            value: result.response.memberSince?.value,
            status: result.response.memberSince?.status
        }
    }]
}