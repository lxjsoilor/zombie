function createRole(imgs, cx, cy, player1, player2, ctxBlood, bloodImg, penBloodImg) {
    return new Role({
        ctxRole: ctxRole,
        roleImg: imgs,
        roleCx: cx || 200,
        roleCy: cy || 200,
        player1: player1,
        player2: player2,

        // 血液图层
        ctxBlood: ctxBlood,
        bloodImg: bloodImg,
        penBloodImg: penBloodImg,

    });
};