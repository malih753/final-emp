import styled from "styled-components";
export const TrendingSessionWrap=styled.div`
.headingWrapper{
    display: flex;
    justify-content: space-between;
}
.cardHodler{
    display: flex;
    justify-content: center;
    gap: 5px;
    .card{
        img{
            width: 400px;
            border-radius: 13px;
            padding-bottom: 10px;
            @media (min-width: 1200px){
                max-width: 205px;
                width: 100%;
            }
        }
        h5{
            margin: 0;
            font-weight: 500;
            font-size: 16px;
            @media (min-width: 576px){
                font-size: 20px;
            }
            @media (min-width: 1200px){
                font-size: 12px;
            }
            @media (min-width: 1440px){
                font-size: 20px;
            }
        }
    }
}
`;