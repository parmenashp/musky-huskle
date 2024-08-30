import { GetMemberRequest } from "../api/proto/members_pb.d"
import { MembersServiceClient } from "../api/proto/MembersServiceClientPb"
import { GameMemberData } from "./types";

const server = new MembersServiceClient("http://proxy:8080");

export default async function fetchMember(name: string): Promise<GameMemberData[]> {
    var request = new GetMemberRequest();

    request = request.setMemberName(name)

    const response = await server.getMembers(request);

    return [{
        avatar: {
            name: response.getName(),
            avatarUrl: response.getAvatarUrl()
        },
        gender: {
            value: response.getGenreIdentity()?.getValue(),
            status: response.getGenreIdentity()?.getStatus(),
        },
        age: {
            value: Number(response.getAge()?.getValue()),
            status: response.getAge()?.getStatus(),
        },
        fursonaSpecies: {
            value: [response.getFursonaSpecies()?.getValue() ?? "undefined"],
            status: response.getFursonaSpecies()?.getStatus()
        },
        fursonaColor: {
            value: response.getColor()?.getValue(),
            status: response.getColor()?.getStatus(),
        },
        workArea: {
            value: [response.getOccupation()?.getValue() ?? "undefined"],
            status: response.getOccupation()?.getStatus(),
        },
        sexuality: {
            value: response.getSexuality()?.getValue(),
            status: response.getSexuality()?.getStatus()
        },
        zodiacSign: {
            value: response.getSign()?.getValue(),
            status: response.getSign()?.getStatus()
        },
        memberSince: {
            value: response.getMemberSince()?.getValue(),
            status: response.getMemberSince()?.getStatus()
        }
    }]
}