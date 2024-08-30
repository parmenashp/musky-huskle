import { GetMembersRequest } from "../gen/api/proto/members_pb.d"
import { MembersServiceClient } from "../gen/api/proto/MembersServiceClientPb"
import { GameMemberData } from "./types";

const server = new MembersServiceClient("http://localhost:8080");

export default async function fetchMember(name: string): Promise<GameMemberData[]> {
    const request = new GetMembersRequest().setMembersNameList([name]);

    const response = await server.getMembers(request);
    return response.getMembersList().map((item) => {
        return {
            avatar: {
                name: item.getName(),
                avatarUrl: item.getAvatarUrl()
            },
            gender: {
                value: item.getGenreIdentity()?.getValue(),
                status: item.getGenreIdentity()?.getStatus(),
            },
            age: {
                value: Number(item.getAge()?.getValue()),
                status: item.getAge()?.getStatus(),
            },
            fursonaSpecies: {
                value: [item.getFursonaSpecies()?.getValue() ?? "undefined"],
                status: item.getFursonaSpecies()?.getStatus()
            },
            fursonaColor: {
                value: item.getColor()?.getValue(),
                status: item.getColor()?.getStatus(),
            },
            workArea: {
                value: [item.getOccupation()?.getValue() ?? "undefined"],
                status: item.getOccupation()?.getStatus(),
            },
            sexuality: {
                value: item.getSexuality()?.getValue(),
                status: item.getSexuality()?.getStatus()
            },
            zodiacSign: {
                value: item.getSign()?.getValue(),
                status: item.getSign()?.getStatus()
            },
            memberSince: {
                value: item.getMemberSince()?.getValue(),
                status: item.getMemberSince()?.getStatus()
            }
        }
    }
    );
}