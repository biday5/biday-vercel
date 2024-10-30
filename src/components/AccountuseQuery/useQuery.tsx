
import {useQuery} from "@tanstack/react-query";
import {fetchProductBySizeId} from "@/service/product/product.service";
import {extractSizeIds} from "@/utils/extract";
import {BidLoadModel} from "@/model/auction/bid.model";

export const useFetchAuctionProducts = (auctionData: any) => {
    const auctionSizeIds = extractSizeIds(auctionData);
    return useQuery({
        queryKey: ["auctionSizeIds", auctionSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                auctionSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: auctionSizeIds.length > 0,
    });
};

export const useFetchBidProducts = (bidayData: any) => {
    return useQuery({
        queryKey: ["sizeIds", bidayData],
        queryFn: async () => {

            const sizeIds = bidayData
                .map((bid: BidLoadModel) => bid.sizeId) // 각 bid에서 sizeId를 추출
                .filter((size: string) => size !== undefined); // undefined 값을 필터링


            const productLists = await Promise.all(
                sizeIds.map((sizeIds: number) => fetchProductBySizeId(sizeIds))
            );

            return productLists.flat();

        },
        enabled: bidayData.length > 0,
    });
};

export const useFetchAwardProducts = (awardData: any) => {
    const awardSizeIds = extractSizeIds(awardData);
    return useQuery({
        queryKey: ["awardSizeIds", awardSizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                awardSizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: awardSizeIds.length > 0,
    });
};

export const useFetchPaymentProducts = (paymentData: any) => {

    const sizeIds = paymentData.map((payment: { sizeId: any; }) => payment.sizeId);
    return useQuery({
        queryKey: ["paymentSizeIds", sizeIds],
        queryFn: async () => {
            const productLists = await Promise.all(
                sizeIds.map((sizeId: number) => fetchProductBySizeId(sizeId))
            );
            return productLists.flat();
        },
        enabled: sizeIds.length > 0,
    });
};