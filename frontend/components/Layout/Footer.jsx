import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import LinkButton from "../LinkButton";

const getContributors = async () => {
  return fetch("/api/contributors").then((r) => r.json());
};

const GithubAvatar = ({ name, ...props }) => (
  <Tooltip label={name} placement={"top"} hasArrow>
    <Avatar name={name} {...props} />
  </Tooltip>
);

const ContributorGroup = () => {
  const [contributors, setContributors] = useState([]);
  useEffect(() => {
    getContributors().then((c) => setContributors(c.data));
  }, []);

  return (
    <VStack>
      <AvatarGroup size={"lg"}>
        {contributors.map((c) => (
          <GithubAvatar
            key={c.login}
            name={`${c.name} (${c.login})`}
            src={c.avatar_url}
            href={c.html_url}
            as={"a"}
            onClick={() => {
              window?.umami?.trackEvent(`avatar.${c.login}.click`, "footer");
            }}
            target={"_blank"}
            opacity={0.7}
            transitionDuration={"200ms"}
            _hover={{
              opacity: 1,
            }}
          />
        ))}
      </AvatarGroup>
      <Button
        size={"xs"}
        fontWeight={300}
        variant={"outline"}
        as={"a"}
        target={"_blank"}
        onClick={() => {
          window?.umami?.trackEvent(`button.github_contribute.click`, "footer");
        }}
        href={"https://github.com/samyok/gophergrades"}
      >
        Contribute on our Github
      </Button>
    </VStack>
  );
};

export const Footer = () => {
  return (
    <Box pt={10} pb={5}>
      <Divider borderColor={"rgba(91,0,19,0.42)"} mb={4} />
      <VStack spacing={4}>
        <ContributorGroup />
        <Text
          textAlign={"center"}
          fontSize={"sm"}
          fontWeight={300}
          color={"gray.600"}
        >
          <NextLink href={"/"}>Gopher Grades</NextLink> is maintained by{" "}
          <LinkButton target={"_blank"} href={"/social-coding"}>
            Social Coding
          </LinkButton>{" "}
          with data from Summer 2017 to Summer 2022 provided by the{" "}
          <LinkButton
            target={"_blank"}
            href={"https://ogc.umn.edu/data-access-and-privacy"}
          >
            Office of Data Access and Privacy
          </LinkButton>
        </Text>
        <LinkButton
          color={"gray.500"}
          fontWeight={"300"}
          target={"_blank"}
          href={"https://gophergrades.com"}
        >
          Inspired by the original Gopher Grades project
        </LinkButton>
      </VStack>
    </Box>
  );
};
