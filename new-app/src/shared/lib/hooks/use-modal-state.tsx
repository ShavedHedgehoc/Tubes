// export function useModalState<T extends string>(
//     params: Record<T, any>,
//     setParams: (val: Partial<Record<T, any>>) => void,
//     key: T
// ) {
//     const isOpen = !!params[key];

//     const onOpenChange = (open: boolean) => {
//         setParams({ [key]: open || null } as any);
//     };

//     return { isOpen, onOpenChange };
// }

// export function useModalState<
//     T extends string,
//     P extends Record<T, unknown>
// >(
//     params: P,
//     setParams: (val: Partial<P>) => void,
//     key: T
// ) {
//     // Безопасно проверяем наличие данных
//     const isOpen = Boolean(params[key]);

//     // Получаем типизированный payload (если это не boolean)
//     const data = (typeof params[key] === 'object' ? params[key] : null) as P[T] | null;

//     const onOpenChange = (open: boolean) => {
//         // Используем приведение к Partial<P>, так как TS не может 
//         // гарантировать связь динамического ключа и null без этого
//         setParams({
//             [key]: open ? true : null
//         } as Partial<P>);
//     };

//     const openWithData = (payload: P[T]) => {
//         setParams({ [key]: payload } as unknown as Partial<P>);
//     };

//     return { isOpen, data, onOpenChange, openWithData };
// }
export function useModalState<
    T extends string,
    P extends Record<T, string | number | boolean | null | undefined>
>(
    params: P,
    setParams: (val: Partial<P>) => void,
    key: T
) {
    // Открыто, если значение не null, не undefined и не false
    const isOpen = params[key] !== null && params[key] !== undefined && params[key] !== false;

    // data теперь может быть строкой или числом
    const data = (isOpen ? params[key] : null) as P[T] | null;

    const onOpenChange = (open: boolean) => {
        setParams({
            [key]: open ? true : null
        } as unknown as Partial<P>);
    };

    const openWithData = (payload: P[T]) => {
        setParams({ [key]: payload } as unknown as Partial<P>);
    };

    return { isOpen, data, onOpenChange, openWithData };
}