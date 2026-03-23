import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import {
  Carousel,
  Box,
  IconButton,
  Image,
  type IconButtonProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { AssestsFolderUrl } from "@/shared/helpers/assets-folder-url";
import Loader from "@/shared/components/info/loader";

export interface SopCaruselProps {
  isPending: boolean;
  items: string[];
}

export default function SopCarousel(props: SopCaruselProps) {
  const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function ActionButton(props, ref) {
      return (
        <IconButton
          {...props}
          ref={ref}
          size="xl"
          variant="ghost"
          rounded="full"
          position="absolute"
          zIndex="1"
          bg="bg"
        />
      );
    },
  );

  if (props.isPending) return <Loader />;
  return (
    <>
      {props.items.length ? (
        <Carousel.Root
          slideCount={props.items.length}
          maxW={{ base: "full", xl: "5xl" }}
          px={{ base: "12", xl: "0" }}
          mx="auto"
          gap="4"
          position="relative"
          colorPalette="white"
        >
          <Carousel.Control gap="4" width="full" position="relative">
            <Carousel.PrevTrigger asChild>
              <ActionButton insetStart={{ base: "2", xl: "-20" }}>
                <LuArrowLeft />
              </ActionButton>
            </Carousel.PrevTrigger>

            <Carousel.ItemGroup width="full">
              {props.items.map((name, index) => (
                <Carousel.Item key={index} index={index}>
                  <Box
                    height={{ base: "400px", md: "70vh" }}
                    maxHeight="700px"
                    width="full"
                    bg="gray.100"
                    _dark={{ bg: "whiteAlpha.50" }}
                    rounded="xl"
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={`${AssestsFolderUrl}/${name}`}
                      alt={name}
                      width="full"
                      height="full"
                      objectFit="contain"
                      draggable={false}
                    />
                  </Box>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <Carousel.NextTrigger asChild>
              <ActionButton insetEnd={{ base: "2", xl: "-20" }}>
                <LuArrowRight />
              </ActionButton>
            </Carousel.NextTrigger>
          </Carousel.Control>
        </Carousel.Root>
      ) : (
        <NotFound message={AppMessages.PICTURES_NOT_FOUND} />
      )}
    </>
  );
}
