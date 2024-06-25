import fetchData from "../config";

interface TypeParams {
    startDate: string,
    endDate: string,
}

const exportCSV = async (params: TypeParams) => {
    return fetchData<TypeParams>("chat/download-csv?" + 'startDate=' + params.startDate + '&endDate=' + params.endDate, "GET");
};

export default exportCSV;
