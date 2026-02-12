#--------------------IMPORTANT-BUILD-NOTES--------------------
# Since Dockerfile needs to access files one dir up,
# you'll need to run `docker buildx build` from one
# directory up from _noDeploy. So, in the root of the
# dir called ZeppelinComputing-site, run:
#
#> docker buildx build --no-cache -t [container-name] .
#
# to build. To run the image on port 8080 (the left port is the external one), run:
#
# docker run -d -p 8080:80 [container-name]
#
# `-d` runs in detached mode. If you want to see specific log info, exclude it.
# `-p` maps external port 8080 to internal port 80.
# If you want to specify a certain container name when run,
# use `--name arbitrary-name`. Usually not necessary though.
#
# To poke around in the container, run this:
#
#> docker run --rm -it --entrypoint=/bin/sh [container-name]
#
# ------------------------------------------------------------


# ----------OTHER-NOTES----------
# If more complexity is needed later, look into multi-stage
# builds to reduce file size.
# -------------------------------



FROM nginx:stable-alpine-slim

# Command to remove default asset "50x.html"
# This is not recommended, as it will otherwise have nothing
# to display in case of a major error. I recommend replacing
# it with a customized version at some point, though.
# RUN rm -rf /usr/share/nginx/html/*

COPY --exclude=OtherResources/ . /usr/share/nginx/html

COPY OtherResources/default.conf /etc/nginx/conf.d/

#clear out docker and non-web-related content.
#RUN rm -rf /usr/share/nginx/html/_noDeploy

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
