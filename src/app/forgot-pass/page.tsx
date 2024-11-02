'use client';

import React, { useState } from 'react';
import Input from '@/shared/Input/Input';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Link from 'next/link';
import { UserModel } from '@/model/user/user.model';
import {emailByPhoneRetrieve} from "@/service/user/user.serivce";
import {setLoading} from "@/lib/features/products.slice";

export default function PageForgotPass() {
    const [phoneNum, setPhoneNum] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, '');

        let formattedValue = '';

        if (phoneValue.length <= 3) {
            formattedValue = phoneValue
        }else if (phoneValue.length <= 7) {
            formattedValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`;
        } else {
            formattedValue = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3,7)}-${phoneValue.slice(7,11)}`;
        }

        setPhoneNum(formattedValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // 오류 상태 초기화
        setLoading(true); // 로딩 상태 시작

        const userData: UserModel = {
            phoneNum: phoneNum,
        };

        try {
            // 이메일 찾기 요청
            const response = await emailByPhoneRetrieve(userData);
            console.log("조회된 데이터: ", response); // 응답 데이터 확인

            if (response && response.email) {
                setEmail(response.email);
                alert(`이메일 조회 성공: ${response.email}`);
            } else {
                setError('해당 전화번호로 조회된 이메일이 없습니다.');
            }
        } catch (err) {
            console.error('이메일 조회 실패:', err);
            setError('전화번호를 확인해 주세요. 이메일 조회에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mb-24 lg:mb-32">
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
                <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Forgot Email
                </h2>
                <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
                    Welcome to BiDay
                </span>
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            전화번호 입력
                        </span>
                        <Input
                            type="text"
                            name="phoneNum"
                            value={phoneNum}
                            onChange={handleChange}
                            placeholder="010-1234-5678"
                            className="mt-1"
                        />
                    </label>
                    <ButtonPrimary type="submit">Continue</ButtonPrimary>
                </form>

                {/* 오류 메시지 출력 */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* 이메일 결과 출력 */}
                {email && (
                    <p className="text-green-500 text-center">
                        조회된 이메일: {email}
                    </p>
                )}

                {/* ==== */}
                <span className="block text-center text-neutral-700 dark:text-neutral-300">
                    Go back for {` `}
                    <Link href="/login" className="text-green-600">
                        Sign in
                    </Link>
                    {` / `}
                    <Link href="/signup" className="text-green-600">
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    );
}