import pkg from '@@/package.json';
import type { IEmployee } from '@/shared/api/services/employee-service';
import { HStack, Text } from '@chakra-ui/react';

export default function UserComponent({ employee }: { employee: IEmployee | null }) {
  return (
    <HStack justify="space-between" h="full" pr={2}>
      <Text color="fg.subtle" fontSize="xs">
        v{pkg?.version ?? ' -'}
      </Text>
      <Text color="fg.subtle" animation={employee ? 'none' : 'colorCycle'}>
        {employee ? employee.name : 'Не авторизован'}
      </Text>
    </HStack>
  );
}
