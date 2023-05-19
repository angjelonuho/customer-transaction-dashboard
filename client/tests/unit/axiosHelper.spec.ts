import axiosInstance from "../../src/helpers/axiosHelper";
import { ApiError } from '@/interface/api/ApiError';


describe('axiosInstance', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle successful response', async () => {
        const responseData = { data: 'success' };
        jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ status: 200, data: responseData });

        const response = await axiosInstance.get('/');

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it('should handle unauthorized error', async () => {
        const errorCode = ApiError.UNAUTHORIZED;
        const errorResponse = {
            response: {
                status: 401,
                data: { error: errorCode },
            },
        };
        jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce(errorResponse);

        await expect(axiosInstance.get('/')).rejects.toEqual(errorResponse);
    });


    it('should handle invalid credentials error', async () => {
        const errorCode = ApiError.INVALID_CREDENTIALS;
        const errorResponse = {
            response: {
                status: 401,
                data: {
                    error: errorCode,
                },
            },
        };
        jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce(errorResponse);

        await expect(axiosInstance.get('/')).rejects.toEqual(errorResponse);
    });

    it('should handle network error', async () => {
        jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('Network Error'));
        await expect(axiosInstance.get('/')).rejects.toThrow('Network Error');
    });

});