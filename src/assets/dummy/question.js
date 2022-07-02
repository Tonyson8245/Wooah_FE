export default {
  hand: [
    {
      step: 1,
      substep: [
        {
          name: "시술 선택",
          description: `시술받고 싶은  종류를 선택해 주세요.`,
          answer: [
            `케어만`,
            `영양만`,
            `케어+영양`,
            `그라데이션`,
            `남자케어`,
            `프렌치`,
            `젤 기본`,
          ],
          skip: true,
          input: false,
        },
        {
          name: "시술 포함 종류",
          description: `기본가격에 어떤 항목이 포함되어 있으면 좋으신가요?
          ex ) 젤네일 + 케어 / 젤네일 + 케어 + 영양`,
          answer: [`케어포함`, `케어+영양포함`],
          skip: false,
          input: false,
        },
        {
          name: "색상 갯수",
          description: `기본가격에 포함된 색상 갯수를 선택해 주세요?
          ex ) 추가금 없이 제공되는 컬러 수 `,
          answer: [`원컬러`, `투컬러`],
          skip: false,
          input: false,
        },
      ],
    },

    {
      step: 2,
      substep: [
        {
          name: "젤 제거 여부",
          description: `현재 손톱에 제거할 젤이 있으신가요? `,
          answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
          skip: false,
          input: false,
        },
        // {
        //   name: "시술 위치",
        //   description: `어디서 네일을 받으셨었나요?`,
        //   answer: [`자샵`, `타샵`],
        //   skip: false,
        //   input: false,
        // },
      ],
    },
    {
      step: 3,
      substep: [
        {
          name: "손톱 연장",
          description: `손톱 연장 하실건가요? `,
          answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
          skip: false,
          input: false,
        },
        {
          name: "연장 갯수",
          description: `손톱 연장 몇 개 하실건가요?`,
          input: true,
        },
      ],
    },
  ],
  foot: [
    {
      step: 1,
      substep: [
        {
          name: "시술 선택",
          description: `발에 시술받고 싶은 종류를 선택해 주세요.`,
          answer: [
            `케어만`,
            `영양만`,
            `케어+영양`,
            `그라데이션`,
            `남자케어`,
            `프렌치`,
            `젤 기본`,
          ],
          skip: true,
          input: false,
        },
        {
          name: "시술 포함 종류",
          description: `기본가격에 어떤 항목이 포함되어 있으면 좋으신가요?
          ex ) 젤네일 + 케어 / 젤네일 + 케어 + 영양`,
          answer: [`케어포함`, `케어+영양포함`],
          skip: false,
          input: false,
        },
        {
          name: "색상 갯수",
          description: `기본가격에 포함된 색상 갯수를 선택해 주세요?
          ex ) 추가금 없이 제공되는 컬러 수 `,
          answer: [`원컬러`, `투컬러`],
          skip: false,
          input: false,
        },
      ],
    },

    {
      step: 2,
      substep: [
        {
          name: "젤 제거 여부",
          description: `현재 발톱에 제거할 젤이 있으신가요?  `,
          answer: [`네, 젤이 있어요`, `아니요, 없어요.`],
          skip: false,
          input: false,
        },
        {
          name: "시술 위치",
          description: `어디서 네일을 받으셨었나요?`,
          answer: [`자샵`, `타샵`],
          skip: false,
          input: false,
        },
      ],
    },
    {
      step: 3,
      substep: [
        {
          name: "발톱 연장",
          description: `발톱 연장 하실건가요? `,
          answer: [`네, 연장 할 거에요`, `아니요, 연장 안할거에요.`],
          skip: false,
          input: false,
        },
        {
          name: "연장 갯수",
          description: `발톱 연장 몇 개 하실건가요?`,
          input: true,
        },
      ],
    },
    {
      step: 4,
      substep: [
        {
          name: `내성 발톱 교정`,
          description: `내성 발톱 교정받길 원하세요?`,
          answer: [`네, 교정 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
          input: false,
        },
      ],
    },
    {
      step: 5,
      substep: [
        {
          name: `발 각질관리`,
          description: `발 각질관리 받길 원하세요?`,
          answer: [`네, 각질관리 할거에요.`, `아니요, 안할거에요.`],
          skip: false,
          input: false,
        },
      ],
    },
  ],
};
