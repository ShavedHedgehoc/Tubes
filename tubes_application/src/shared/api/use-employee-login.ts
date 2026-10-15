import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import EmployeeService, { type IEmployee } from '@/shared/api/services/employee-service';
import handleError from '@/shared/api/http/handle-error';

import { AppMessages } from '../resources/app-messages';

export function useEmployeeLogin({
  setEmployee,
  postVal,
}: {
  setEmployee: (val: IEmployee) => void;
  postVal: number;
}) {
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: EmployeeService.getEmployeeByBarcode,
    onSuccess: (data) => {
      if (data) {
        const mappedAllowedPostVals = (data.allowed_posts || []).map((ap) => ap.value);
        const isAllowed = mappedAllowedPostVals.includes(postVal);
        if (isAllowed) {
          setEmployee(data);
          enqueueSnackbar(AppMessages.AUTH_SUCCESSFUL, {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        } else {
          enqueueSnackbar(`${AppMessages.NOT_ALLOWED_TO_POST}${postVal}`, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        }
      } else {
        enqueueSnackbar(AppMessages.EMPLOYEE_NOT_FOUND, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(Array.isArray(error) ? error.map((item) => item).join(',') : error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    },
  });
  return { login, isLoginPending, loginData, isLoginSuccess };
}
