import React from "react";
import { useParams } from "react-router-dom";
import LayoutStudent from "../../../components/student/layout";
import axiosInstance from "../../../config/axiosInstance";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import Evaluation from "./evaluation";
import { useAppSelector } from "../../../app/hooks";
import Feedback from "./feedback";
import Editor from "../../../components/utils/editor";

const ChapterPage = () => {
  const [page, setPage] = React.useState<string>("");
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataFeedback, setDataFeedback] = React.useState<any>(null);
  const [initQuestion, setInitQuestions] = React.useState<any[]>([]);
  const { chapter_id } = useParams();

  const user = useAppSelector((state) => state.auth.user);

  const getChapter = async () => {
    setLoading(true);
    const res = await axiosInstance.get(`/chapters/${chapter_id}`);
    setData(res.data);
    setInitQuestions(res?.data?.questions ?? []);
    setLoading(false);
  };

  React.useEffect(() => {
    getChapter();
  }, [chapter_id]);

  const handleBack = () => {
    const cleanQuestion = [];

    for (const q of initQuestion) {
      const { user_select, options, ...res } = q;
      const filterOption = options?.map((op: any) => {
        const { user_select, ...res } = op;
        return {
          ...res,
        };
      });

      cleanQuestion.push({
        ...res,
        options: filterOption,
      });
    }
    setData({
      ...data,
      questions: [...cleanQuestion],
    });
    setPage("");
  };

  const handleSubmit = async (questions: any[]) => {
    try {
      const data = {
        user_id: user?._id,
        chapter_id,
        questions,
      };

      const res = await axiosInstance.post(
        `/user_califications/evaluation`,
        data
      );

      setDataFeedback(res.data ?? null);

      setPage("FEEDBACK");
    } catch (error) {}
  };

  const renderContent = () => {
    switch (page) {
      case "":
        return (
          <Box margin="0 auto" py={4}>
            <Text fontWeight={"bold"} fontSize={"3xl"}>
              {data?.name}
            </Text>
            <Text fontWeight={"semibold"} mt={4} fontSize={"lg"}>
              Información
            </Text>

            {data?.information !== "" ? (
              <Editor value={data?.information ?? ""} readOnly />
            ) : null}

            <Button
              onClick={() => setPage("EVALUATION")}
              mt={4}
              colorScheme="green"
              variant={"outline"}
            >
              INICIAR EVALUACIÓN
            </Button>
          </Box>
        );
      case "EVALUATION":
        return (
          <Evaluation
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            questions={data?.questions ?? []}
          />
        );
      case "FEEDBACK":
        return <Feedback handleBack={handleBack} data={dataFeedback} />;
    }
  };

  return (
    <LayoutStudent activeMaxWidth={false}>
      <Box
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
        h="full"
        bg="white"
        px={4}
      >
        {loading ? (
          <Box
            display={"flex"}
            h="full"
            style={{
              minHeight: "calc(100vh - 64px)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner colorScheme="green" size={"xl"} />
          </Box>
        ) : (
          <Box maxW="1000px" margin="0 auto">
            {renderContent()}
          </Box>
        )}
      </Box>
    </LayoutStudent>
  );
};

export default ChapterPage;
