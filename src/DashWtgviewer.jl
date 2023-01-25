
module DashWtgviewer
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.19"

include("jl/dashwtgviewer.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_wtgviewer",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_wtgviewer.min.js",
    external_url = "https://unpkg.com/dash_wtgviewer@0.0.19/dash_wtgviewer/dash_wtgviewer.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_wtgviewer.min.js.map",
    external_url = "https://unpkg.com/dash_wtgviewer@0.0.19/dash_wtgviewer/dash_wtgviewer.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
