// src/service/user/user.api.ts
import { UserModel } from "@/model/UserModel";

// 공통 API URL 설정
let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/users`;

// 공통 fetch 처리 함수
async function apiRequest(
    endpoint: string,
    method: string = "GET",
    // GET 메서드로 할당한 이유는
    // 조회를할 때 GET을 많이 사용을 하기 때문에 그래서 변경해야 할 때
    // 명시적으로 메서드를 변경을 하면 된다.
    body?: any
): Promise<any> {
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${url}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,

        });

        if (!response.ok) {
            throw new Error(`API 불러오는데 실패 : ${response.status}`);
        }

        console.log("response 응답 확인 src/service/user/user.api.ts : " + response)
        console.log("response 응답 확인 src/service/user/user.api.ts status : " + response.status)
        console.log("response 응답 확인 src/service/user/user.api.ts json : " + response.json)

        return await response.json();
    } catch (error) {
        console.error(`API 에러 요청 : ${endpoint}`, error);
        throw error;
    }
}

// 회원가입 API
export async function insertUser(user: UserModel): Promise<any> {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
        zipcode: user.zipcode,
        streetAddress: user.streetAddress,
        detailAddress: user.detailAddress,
        type: user.addressType,
    };

    try {
        const data = await apiRequest("/join", "POST", body);
        console.log("유저 등록 성공:", data);
        return { ...data, status: true }; // 성공 시 true 반환
    } catch (error) {
        console.error('Error inserting user:', error);
        return { status: false }; // 실패 시 false 반환
    }
}

// 로그인 API
export const handleLogin = async (username: string, password: string): Promise<Response> => {
    return apiRequest("/login", "POST", { email: username, password });
};

// 유저 삭제 API
export async function deleteUser(id: number): Promise<void | { status: number }> {
    console.log("deleteUser API 호출 - ID:", id);
    try {
        await apiRequest(`/${id}/cancel`, "DELETE");
    } catch (error) {
        return { status: 500 };
    }
}

// 유저 업데이트 API
export const updateUser = async (id: number, user: UserModel): Promise<Response> => {
    const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
        zipcode: user.zipcode,
        streetAddress: user.streetAddress,
        detailAddress: user.detailAddress,
        type: user.addressType,
    };

    return apiRequest(`/${id}`, "PUT", body);
};
